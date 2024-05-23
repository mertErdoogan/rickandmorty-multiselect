
"use client"

import { api } from "@/api";
import { RickandmortyCharacter } from "@/api/rickandmorty";
import Image from "next/image";
import { ChangeEvent, KeyboardEvent, useState } from "react";


export default function CharacterSearchMulti() {

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchList, setSearchList] = useState<RickandmortyCharacter[]>([]);
  const [selectedChars, setSelectedChars] = useState<RickandmortyCharacter[]>([]);

  const [timer, setTimer] = useState<number | null>(null);

  const onSearchTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setIsLoading(true);
    if (e.target.value !== "") {
      await fetchDataAfterHalfSec(e.target.value);
    }
  }

  const getFilteredList = async (target: string) => {
      try {
        await api.rickandmortyApi.getCharacter({name: target}).then((res) => {
        if (res.status === 200) {
          setSearchList(res.data.results)
        } else {
          setSearchList([]);
        }
      
      }).finally(() => setIsLoading(false))
    } catch(err) {
          setSearchList([])
          throw new Error('ssssss');
    }
  }

  const fetchDataAfterHalfSec = async (target: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = window.setTimeout(async () => {
      await getFilteredList(target);
    }, 500);
    setTimer(newTimer);
  }

  const onClickOption = (char: RickandmortyCharacter) => {
    if(!isSelectedCharacter(char.id)) {
      setSelectedChars(prev => [...prev, char])
    } else {
      setSelectedChars(prev => prev.filter(({id}) => id !== char.id))
    }
  }

  const isSelectedCharacter = (charId: number) => {
    return !!selectedChars.find(({id}) => id === charId)
  }

  const removeOption = (id: number) => {
    setSelectedChars(prev => prev.filter((option) => option.id !== id))
  }

  const removeLastOption = () => {
    if (selectedChars.length === 0) {
      return;
    }
    setSelectedChars(prev => prev.slice(0, prev.length -1))
  }

  const boldSubstring = (text: string, substring: string): string => {
    if (!substring) {
      return text; 
    }
    
    const regex = new RegExp(`(${substring})`, 'gi');
    return text.replace(regex, '<b>$1</b>');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Backspace') {
      if(searchText.length < 1) {
        removeLastOption();
      }      
    }
  }

  return (
    <>
      <label
        htmlFor="searchBox"
        onKeyDown={handleKeyDown}
        className="border border-blue-800 flex items-center w-full rounded-xl p-1"
      >
        <div className="gap-1 flex items-center flex-wrap">
          {selectedChars &&
            selectedChars.map(({ id, name }) => (
              <div
                className="bg-blue-100/50 px-3 py-1 space-x-2 rounded-xl"
                key={id}
              >
                <span className="font-medium">{name}</span>
                <button
                  onClick={() => removeOption(id)}
                  className="text-white bg-blue-700/20 rounded-lg px-2 py-0.5 hover:bg-blue-800/10"
                >
                  X
                </button>
              </div>
            ))}
        </div>
        <input
          id="searchBox"
          className="outline-none min-w-[200px] bg-transparent px-2 py-1"
          type="text"
          value={searchText}
          onChange={onSearchTextChange}
        />
      </label>
      {searchText.length > 0 && (
        <div className="min-h-[520px] h-[520px] overflow-y-auto rounded-xl border border-blue-800 mt-3">
          {isLoading && (
            <div className="w-full h-full flex items-center justify-center">
              Loading...
            </div>
          )}
          {searchList &&
            !isLoading &&
            searchList.map((item) => (
              <label
                key={`${item.id}-${item.name}`}
                className="flex items-center border-b border-blue-800 p-3 space-x-3 hover:bg-black/5 cursor-pointer"
              >
                <input
                  defaultChecked={isSelectedCharacter(item.id)}
                  onClick={() => onClickOption(item)}
                  type="checkbox"
                />
                <div className="space-x-3 flex">
                  <div className="w-14 h-14 rounded bg-gray-500">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className="space-y-1">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: boldSubstring(item.name, searchText),
                      }}
                      className="block"
                    />
                    <span className="block">{item.episode.length} episode</span>
                  </div>
                </div>
              </label>
            ))}
        </div>
      )}
    </>
  );
}