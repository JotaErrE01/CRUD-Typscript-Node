import { Request, Response } from "express";
import Usuario from '../model/Usuario';


export const getUsuarios = async ( req: Request, res: Response ) => {
    
    const usuarios = await Usuario.findAll();

    res.json( usuarios );

}

export const getUsuario = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );
    if (usuario) {
        res.json( usuario );
    }else{
        res.status(404).json({msg: 'Usuario no encontrado'});
    }

}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const emailExist = await Usuario.findOne({ where: { email: body.email } });
        if (emailExist) {
            return res.status(400).json({msg: 'El email ya existe'});
        }

        const usuario = await Usuario.create( body );
        await usuario.save();
        res.json( usuario );
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al crear usuario'});
    }

}

export const putUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        
        const usuario = await Usuario.findByPk( id );
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        await usuario.update( body ); // si hay campos que no estan incluidos en el modelo, estos son ignorados    

        res.json( usuario );

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al actualizar usuario' });
    }

    res.json({
        msg: 'postUsuario',
        body,
        id  
    })
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if (!usuario) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    //eliminacion fisica
    // await usuario.destroy();

    // eliminacion logica
    await usuario.update({ estado: false });

    res.json({ msg: 'Usuario eliminado' });
}
