import { api } from "@/api";
import CharacterSearchMulti from "@/components/pages/Home/CharacterSearchMulti";

export default async function Home() {
  const searchApi = api.rickandmortyApi.getCharacter;
  return (
    <div>
      <div className="container mx-auto p-24">
        <CharacterSearchMulti />
      </div>
    </div>
  );
}
