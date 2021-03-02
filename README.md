# node - multer upload images

### Instalar dependencias:
``` cmd
    npm install express multer ejs uuid
```

### Creamos servidor con express (src/index.js):
```javascript
    const express = require('express');
    const app = express();

    //Settings:
    app.set('port',process.env.PORT || 3500);

    //Routes:
    app.use(require('./routes/index.routes'));

    //Start server:
    app.listen(app.get('port',()=>{
        console.log(`Server on PORT ${app.get('port')}`);
    }));
```
### Creamos las rutas (src/routes/index.routes.js)
```javascript
    const {Router} = require('express');
    const router = Router();

    //Renderizamos a la pagina principal con el formulario
    router.get('/index',(req,res)=>{
        res.render('index')
    });

    //Metodo post
    router.post('/upload/',(req,res)=>{
        console.log(req.file);
        res.redirect('/index/');
    })
```

### Creamos la vistas-ejs (src/views/index.ejs)
```html
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node Multer - uploadImages</title>
    <!--BOOTSWATCH-->
    <link rel="stylesheet" href="https://bootswatch.com/4/litera/bootstrap.min.css">

</head>
<body>
    <h1 class="display-4 text-center p-4">Upload your images</h1>
    <div class="row my-auto">
        <div class="col-md-4 offset-md-4">
            <div class="card card-body shadow">
                <form action="/upload/" method='POST' enctype="multipart/form-data">
                <div class="form-group">
                    <input 
                        type="file" 
                        name="image"
                        class="form-control">
                </div>
                <button class="btn btn-primary btn-lg">Upload</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
```

### Configuramos multer y uuid dentro del servidor (src/index.js):
```javascript
    const multer = require('multer');
    const{v4:uuidv4} = require('uuid');

    //Middlewares
    const storage = multer.diskStorage({
        destination:path.join(__dirname,'public/uploads'),
        filename:(req,file,cb)=>{
            cb(null,uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        }
    });

    app.use(multer({
        storage,
        dest:path.join(__dirname,'public/uploads'),
        limits:{fileSize:1000000},
        fileFilter:(req,file,cb)=>{
            const filetypes = /jpeg|jpg|png|gif/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname));
            if (mimetype && extname){
                return cb(null,true);
            }
            cb("Error: El archivo debe ser una imagen valida");
        }
    }).single('image'));
```

### Inicializar aplicación:
```cmd
    npm run dev
```