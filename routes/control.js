const { Router } = require('express');
const router = Router();
const axios = require('axios');


router.get('/consultarCantidades', (req, res) => {
    res.render('consultarCantidades');
})

router.post('/consultarCantidades', async (req, res) => {

    const { grupo } = req.body;

    const instance = axios.create({
        baseURL: `http://localhost:4000/prod/productos/${grupo}`
    })

    const result = await instance.get();

    const data = JSON.stringify(result.data.cont);

    res.render('../views/consultarCantidades', {
        data
    });
});

router.get('/registrarProducto', async (req, res) => {

    const instance = axios.create({
        baseURL: `http://localhost:4000/prod/productos`
    })

    let productos = await instance.get();

    productos = productos.data;



    res.render('registrarProducto', { productos });

})

router.post('/registrarProducto', async (req, res) => {

    const { nombre, cantidad, subcategoria, fecha, grupo, programa, facultad } = req.body;

    axios({
        method: 'POST',
        url: `http://localhost:4000/prod/addProd`,
        data: {
            nombre,
            cantidad,
            subcategoria,
            fecha,
            grupo,
            programa,
            facultad
        }
    })
    .then((respuesta)=>{
        res.redirect('registrarProducto')
    })
    .catch((error)=>{
        console.log(error)
    })

    
})

router.get('/consultarCantTipo', (req, res)=>{
    res.render('consultarCantTipo');
})

router.post('/consultarCantTipo', async (req, res) => {

    const { tipo } = req.body;

    const instance = axios.create({
        baseURL: `http://localhost:4000/prod/cantidad/${tipo}`
    })

    const result = await instance.get();

    const data = JSON.stringify(result.data.cant);

    res.render('../views/consultarCantTipo', {
        data
    });
});




module.exports = router;