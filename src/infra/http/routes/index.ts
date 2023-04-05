import { Request, Response, Router } from 'express';
import { pokemonsRoutes } from './pokemons.routes';
import { batalharRoutes } from './batlhar.routes';

const router = Router();

router.use("/", (request: Request, response: Response) => {
    response.json({
            message: 'api-pokemon',
            author: 'Fellipe Silvério Brandão'
        })
});

router.use("/pokemons", pokemonsRoutes);
router.use("/batalhar", batalharRoutes);


export { router };