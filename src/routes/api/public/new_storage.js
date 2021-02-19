import { compose } from "compose-middleware";
import { USERS_READ } from "../../../constants/PERMISSIONS";
import { query } from "../../../db";
import checkPermissionsMW from "../../../middlewares/checkPermissionsMW";

export const post =
    async (req, res) => {
        const { name, description, location } = req.body;
        const {rows: storages} = await query(
            `INSERT INTO public.storages
                ( name, description, location )
                VALUES ($1::character varying, $2::character varying, $3::character varying)
                RETURNING id_storage;
            `, [ name, description, location ]
        );

        res.json( storages[0] );
    }