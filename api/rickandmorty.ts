import axios from 'axios'
import { apiClient } from './apiClient';

export interface RickandmortyCharacter {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

interface RickandmortyResponse {
  info: {};
  results: RickandmortyCharacter[]
}

type RickandmortyPayload = {
  name: string
}

async function getCharacter(payload: RickandmortyPayload) {
  try {
    return await apiClient<RickandmortyResponse>("/character", {
      params: payload
    }).then(
      (res) => {
        return res;
      }
    );
  } catch (error) {
    throw new Error('error data fetch')
  }
}

export const rickandmortyApi = {
    getCharacter: getCharacter
}