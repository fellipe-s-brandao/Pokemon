import { PokemonsController } from "@modules/pokemons/useCases/PokemonsController";
import { Router } from "express";

const pokemonsRoutes = Router();

const pokemonsController = new PokemonsController();

pokemonsRoutes.post("", pokemonsController.createPokemon);
pokemonsRoutes.put("/:id", pokemonsController.updatePokemon);
pokemonsRoutes.delete("/:id", pokemonsController.deletePokemon);
pokemonsRoutes.get("/:id", pokemonsController.findPokemon);
pokemonsRoutes.get("", pokemonsController.findAllPokemons);

export { pokemonsRoutes }