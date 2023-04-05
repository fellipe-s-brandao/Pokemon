import { PokemonsController } from "@modules/pokemons/useCases/PokemonsController";
import { Router } from "express";

const batalharRoutes = Router();

const pokemonsController = new PokemonsController();

batalharRoutes.post("/:id1/:id2", pokemonsController.batalhar);

export { batalharRoutes }