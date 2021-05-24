const express = require("express");
const app = express();
const mysql = require("mysql")
const bcrypt = require("bcryptjs")
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const axios = require('axios');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "suscribed",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 24 * 24
    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "HvF:V=`n^G25j3:<",
    database: "SCJDatabase"
})

app.get('/practicas', (req, res) => {
    db.query("SELECT * FROM Practicas", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})
app.get('/juntas', (req, res) => {
    db.query("SELECT * FROM Juntas", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})
app.get('/visitas', (req, res) => {
    db.query("SELECT * FROM visitas", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.get('/eventos', (req, res) => {
    db.query("SELECT * FROM Eventos", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})
app.post('/subscribedEvents', (req, res) => {
    const idIntegrante = req.body.idIntegrante

    db.query("SELECT DISTINCT e.nombreEvento FROM eventos e, integrante_evento ie WHERE e.noEvento = ie.noEvento AND ? = ie.idIntegrante;", [idIntegrante], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})
app.post('/materialsRelatedToEvent', (req, res) => {
    const noEvento = req.body.noEvento

    db.query("SELECT m.idMateriales, m.nombre,m.tipo,m.cantidad FROM materiales m, materiales_eventos me WHERE m.idMateriales = me.idMateriales AND ? = me.noEvento;", [noEvento], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result)
            res.send(result)
        }
    })
})




app.get('/integrantes', async (req, res) => {
    db.query("SELECT * FROM Integrante",
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result)
            }
        })
})


app.post('/reCaptcha', async (req, res, next) => {
    if (!req.body.token) {
        res.send("no token")
    }
    try {
        const secret = "6LdSbs0aAAAAAAgd-H0HdXPm7XSAksx7drVchfBW"
        const url = "https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + req.body.token

        const response = await axios.post(url)
        const { success } = response.data

        if (success) {
            console.log(success)
            res.send(response.data)
        }
        else {
            res.send(response.data)


        }
    } catch (e) {
        console.log(e)
    }
})

app.post('/createLabReport', async (req, res) => {
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const categoria = req.body.categoria

    db.query("INSERT INTO practicas (nombre,descripcion,categoria) VALUES(?,?,?)",
        [nombre, descripcion, categoria],
        (err, result) => {
            if (err) { console.log(err) }
            else {
                res.send(result)

            }
        })
})
app.post('/createMaterial', async (req, res) => {
    const nombre = req.body.nombre
    const tipo = req.body.tipo
    const cantidad = req.body.cantidad
    const noEvento = req.body.noEvento
    let lastInsertMatId
    db.query("INSERT INTO materiales (nombre,tipo,cantidad) VALUES(?,?,?)",
        [nombre, tipo, cantidad],
        (err, result) => {
            if (err) { console.log(err) }
            else {
                res.send(result)

            }
        })
    db.query("SELECT LAST_INSERT_ID()", (err, result) => {
        if (err) { console.log(err) }
        else {
            console.log("Last inserted material id :" + result[0]["LAST_INSERT_ID()"])
            lastInsertMatId = result[0]["LAST_INSERT_ID()"]
            db.query("INSERT INTO materiales_eventos (noEvento,idMateriales) VALUES (?,?)", [noEvento, lastInsertMatId],
                (err, result) => {
                    if (err) { console.log(err) }
                    else {
                        console.log(result)
                    }
                })
        }
    })

})

app.post('/createVisit', async (req, res) => {
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const categoria = req.body.categoria

    db.query("INSERT INTO visitas (nombre,descripcion,categoria) VALUES(?,?,?)",
        [nombre, descripcion, categoria],
        (err, result) => {
            if (err) { console.log(err) }
            else {
                res.send(result)

            }
        })
})

app.post('/createJunta', async (req, res) => {
    const tipo = req.body.tipo
    const descripcion = req.body.descripcion
    const partipantes = req.body.participantes

    db.query("INSERT INTO Juntas (tipo,descripcion,participantes) VALUES(?,?,?)",
        [tipo, descripcion, partipantes],
        (err, result) => {
            if (err) { console.log(err) }
            else {
                res.send(result)

            }
        })
})

app.post('/create', async (req, res) => {
    console.log(req);
    const nombre = req.body.nombre
    const correo = req.body.correo
    const apellidos = req.body.apellidos
    const telefono = req.body.telefono
    const puesto = req.body.puesto
    const password = req.body.password
    const fecha = req.body.fecha
    const activo = req.body.activo

    db.query('INSERT INTO Integrante (nombre,apellidos,telefono,correo_electronico,contraseña,fechaInscripcion,puesto,activo) VALUES (?,?,?,?,?,?,?,?)',
        [nombre, apellidos, telefono, correo, password, fecha, puesto, activo],
        (err, result) => {

            if (err) { console.log(err) }
            else { res.send("Values inserted") }

        }
    );
});

app.post('/createEvent', async (req, res) => {
    console.log(req);
    const nombre = req.body.nombreEvento
    const ciudad = req.body.ciudad
    const nacional = req.body.nacional
    const descripcion = req.body.descripcion

    //const hashedPassword = await bcrypt.hash(password, 10)
    //console.log(hashedPassword)
    db.query('INSERT INTO Eventos (nombreEvento,ciudad,nacional,descripcion) VALUES (?,?,?,?)',
        [nombre, ciudad, nacional, descripcion],
        (err, result) => {

            if (err) { console.log(err) }
            else { res.send("Values inserted") }

        }
    );
});

app.post('/suscribeToEvent', async (req, res) => {
    console.log(req)
    const idIntegrante = req.body.idIntegrante
    const noEvento = req.body.noEvento
    const fecha = req.body.fecha
    db.query("INSERT INTO integrante_evento (idIntegrante,noEvento,fecha) VALUES (?,?,?)", [idIntegrante, noEvento, fecha],
        (err, result) => {
            if (err) { console.log(err) }
            else { res.send('Values inserted') }
        })
})
app.post('/unsubscribeToEvent', async (req, res) => {
    console.log(req)
    const idIntegrante = req.body.idIntegrante
    const noEvento = req.body.noEvento
    const fecha = req.body.fecha
    db.query("DELETE FROM integrante_evento (idIntegrante,noEvento,fecha) VALUES (?,?,?)", [idIntegrante, noEvento, fecha],
        (err, result) => {
            if (err) { console.log(err) }
            else { res.send('Values inserted') }
        })
})

app.delete('/deleteEvent/:id', async (req, res) => {
    console.log(req)
    const id = req.params.id
    console.log(id)
    db.query("DELETE FROM Eventos WHERE noEvento = ?", id,
        (err, result) => {
            if (err) {
                console.log(id)
                console.log(err)
            }
            else { res.send(result) }
        })
})


app.delete('/deleteLabReport/:id', async (req, res) => {
    console.log(req)
    const id = req.params.id
    console.log(id)
    db.query("DELETE FROM Practicas WHERE noPractica = ?", id,
        (err, result) => {
            if (err) {
                console.log(id)
                console.log(err)
            }
            else { res.send(result) }
        })
})
app.delete('/deleteMeeting/:id', async (req, res) => {
    console.log(req)
    const id = req.params.id
    console.log(id)
    db.query("DELETE FROM Juntas WHERE noJuntas = ?", id,
        (err, result) => {
            if (err) {
                console.log(id)
                console.log(err)
            }
            else { res.send(result) }
        })
})
app.delete('/deleteMaterial/:id', async (req, res) => {
    console.log(req)
    const id = req.params.id
    console.log(id)
    db.query("DELETE FROM materiales WHERE idMateriales = ?", id,
        (err, result) => {
            if (err) {
                console.log(id)
                console.log(err)
            }
            else { res.send(result) }
        })
})
app.delete('/deleteVisit/:id', async (req, res) => {
    console.log(req)
    const id = req.params.id
    console.log(id)
    db.query("DELETE FROM Visitas WHERE noVisita = ?", id,
        (err, result) => {
            if (err) {
                console.log(id)
                console.log(err)
            }
            else { res.send(result) }
        })
})
app.delete('/deleteMember/:id', async (req, res) => {
    console.log(req)
    const id = req.params.id
    console.log(id)
    db.query("DELETE FROM Integrante WHERE idIntegrante = ?", id,
        (err, result) => {
            if (err) {
                console.log(id)
                console.log(err)
            }
            else { res.send(result) }
        })
})

app.get('/login', (req, res) => {
    if (req.session.user) {

        res.send({ LoggedIn: true, user: [req.session.user] });
    }
    else {
        res.send({ LoggedIn: false, user: [] });
    }
})

app.post('/login', async (req, res) => {
    try {
        console.log(req);
        const correo = req.body.correo
        const password = req.body.password
        db.query("SELECT * FROM Integrante WHERE correo_electronico = ? AND contraseña =? ",
            [correo, password], (err, result) => {
                if (err) {
                    res.send({ err: err })
                }
                if (result) {
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result)
                }
                else {
                    res.send({ message: "Wrong combination" })
                }
            })

    }

    catch (e) {
        console.log(e);
        res.status(500).send('error ocurred');
    }


});

app.put('/updateEvent', async (req, res) => {
    try {
        const noEvento = req.body.noEvento
        const nuevoNombre = req.body.nuevoNombre
        const nuevaCiudad = req.body.nuevaCiudad
        const nuevaDireccion = req.body.nuevaDireccion
        const nuevaFecha = req.body.nuevaFecha
        const boolNacional = req.body.boolNacional
        const nuevaDescripcion = req.body.nuevaDescripcion
        db.query("UPDATE Eventos SET nombreEvento = ?, ciudad = ?, nacional = ?,direccion = ?, fecha = ?,descripcion = ? WHERE noEvento = ?", [nuevoNombre, nuevaCiudad, boolNacional, nuevaDireccion, nuevaFecha, nuevaDescripcion, noEvento], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                res.send(result)
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})
app.put('/updateMember', async (req, res) => {
    try {
        const idIntegrante = req.body.idIntegrante
        const nuevoNombre = req.body.nuevoNombre
        const nuevaApellidos = req.body.nuevaApellidos
        const nuevoPuesto = req.body.nuevoPuesto

        console.log(idIntegrante)
        db.query("UPDATE integrante SET nombre = ?, apellidos = ?, puesto = ? WHERE idIntegrante = ?", [nuevoNombre, nuevaApellidos, nuevoPuesto, idIntegrante], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                console.log(result)
                res.send(result)
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})
app.put('/updateLabReport', async (req, res) => {
    try {
        const noPractica = req.body.noPractica
        const nuevoNombre = req.body.nuevoNombre
        const nuevaCategoria = req.body.nuevaCategoria
        const nuevaDescripcion = req.body.nuevaDescripcion
        const nuevaFecha = req.body.nuevaFecha

        console.log(noPractica)
        db.query("UPDATE practicas SET nombre = ?, categoria = ?, descripcion = ?, fecha = ? WHERE noPractica = ?", [nuevoNombre, nuevaCategoria, nuevaDescripcion, nuevaFecha, noPractica], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                console.log(result)
                res.send(result)
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})
app.put('/updateVisit', async (req, res) => {
    try {
        const noVisita = req.body.noVisita
        const nuevoNombre = req.body.nuevoNombre
        const nuevaCategoria = req.body.nuevaCategoria
        const nuevaDescripcion = req.body.nuevaDescripcion
        const nuevaFecha = req.body.nuevaFecha

        console.log(noVisita)
        db.query("UPDATE visitas SET nombre = ?, categoria = ?, descripcion = ?, fecha = ? WHERE noVisita = ?", [nuevoNombre, nuevaCategoria, nuevaDescripcion, nuevaFecha, noVisita], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                console.log(result)
                res.send(result)
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})
app.put('/updateMeeting', async (req, res) => {
    try {
        const noJuntas = req.body.noJuntas
        const nuevoTipo = req.body.nuevoTipo
        const nuevaDescripcion = req.body.nuevaDescripcion
        const nuevaFecha = req.body.nuevaFecha

        console.log(noJuntas)
        db.query("UPDATE juntas SET tipo = ?, descripcion = ?, fecha = ? WHERE noJuntas = ?", [nuevoTipo, nuevaDescripcion, nuevaFecha, noJuntas], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                console.log(result)
                res.send(result)
            }
        })
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/getUser', async (req, res) => {
    try {
        const idIntegrante = req.body.id
        db.query("SELECT * FROM Integrantes WHERE idIntegrante = ? ",
            [idIntegrante], (err, result) => {
                if (err) {
                    res.send({ err: err })
                }
                if (result) {
                    console.log(req.session.user);
                    res.send(result)
                }
                else {
                    res.send({ message: "Wrong combination" })
                }
            })

    }

    catch (e) {
        console.log(e);
        res.status(500).send('error ocurred');
    }


});

app.get("/dashboard", (req, res) => {
    if (req.session.user) {
        res.send(req.session.user)
    }
    else {
        res.redirect("/login")
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});
app.listen(3002, () => {
    console.log("Server started on port 3002.");
});
