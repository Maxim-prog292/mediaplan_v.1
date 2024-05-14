const pool = require('../data/config')

const router = app => {
    // главная директория
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    // получение списка мероприятий 
    app.get("/mediaplan_data", (req, res) => {
        const q = "SELECT * FROM mediaplan_data";
        pool.query(q, (err, data) => {
          if (err) {
            return res.json(err);
          } else {
            return res.json(data);
          }
        });
    });

    // получение мероприятия по айди
    app.get("/mediaplan_data/:id", (req, res) => {
        const eventId = req.params.id;
        const q = `SELECT * FROM mediaplan_data WHERE eventID = ?`;
        pool.query(q, [eventId], (err, data) => {
            if (err) {
            return res.json(err);
            } else {
            return res.json(data);
            }
        });
    });

    // добавление мероприятий
    app.post("/mediaplan_data", (req, res) => {
        const q =
          "INSERT INTO mediaplan_data (`eventID`, `eventDateStart`, `eventDateEnd`, `eventTimeStart`, `eventTimeEnd`, `eventType`, `eventName`, `eventDescription`, `eventRelease`, `eventLocation`, `eventCount`, `eventResponsible`, `eventPlan`, `eventSmi`, `eventPressSmi`, `eventNoPress`, `eventPressInfo`, `eventStatus`,`eventMonth`) VALUES (?)";
        const values = [
          req.body.eventID,
          req.body.eventDateStart,
          req.body.eventDateEnd,
          req.body.eventTimeStart,
          req.body.eventTimeEnd,
          req.body.eventType,
          req.body.eventName,
          req.body.eventDescription,
          req.body.eventRelease,
          req.body.eventLocation,
          req.body.eventCount,
          req.body.eventResponsible,
          req.body.eventPlan,
          req.body.eventSmi,
          req.body.eventPressSmi,
          req.body.eventNoPress,
          req.body.eventPressInfo,
          req.body.eventStatus,
          req.body.eventMonth

        ];
      
        pool.query(q, [values], (err, data) => {
          if (err) {
            return res.json(
              `Мероприятие не добавлено ошибка ${(err.code, err.message)}`
            );
          } else {
            return res.json(`Мероприятие добавлено успешно`);
          }
        });
    });

    // удаление мероприятий
    app.delete("/mediaplan_data/:id", (req, res) => {
        const eventId = req.params.id;
        const q = "DELETE FROM mediaplan_data WHERE eventID = ?";
      
        pool.query(q, [eventId], (err, data) => {
          if (err) {
            return res.json(
              `Мероприятие не удалено. Ошибка ${(err.code, err.message)}`
            );
          } else {
            return res.json(`Мероприятие удалено успешно`);
          }
        });
    });

    // изменение мероприятий
    app.patch("/mediaplan_data/:id", (req, res) => {
        const eventId = req.params.id;
        const q = `UPDATE mediaplan_data SET eventDateStart = ?, eventDateEnd = ?, eventTimeStart = ?,eventTimeEnd = ?, eventType = ?, eventName = ?, 
                  eventDescription = ?, eventRelease = ?, eventLocation = ?, 
                  eventCount = ?, eventResponsible = ?, eventPlan = ?, 
                  eventSmi = ?, eventPressSmi = ?, eventNoPress = ?, 
                  eventPressInfo = ?, eventStatus = ?, eventMonth = ? WHERE eventID = ?`;
      
        const values = [
          req.body.eventDateStart,
          req.body.eventDateEnd,
          req.body.eventTimeStart,
          req.body.eventTimeEnd,
          req.body.eventType,
          req.body.eventName,
          req.body.eventDescription,
          req.body.eventRelease,
          req.body.eventLocation,
          req.body.eventCount,
          req.body.eventResponsible,
          req.body.eventPlan,
          req.body.eventSmi,
          req.body.eventPressSmi,
          req.body.eventNoPress,
          req.body.eventPressInfo,
          req.body.eventStatus,
          req.body.eventMonth
        ];
      
        pool.query(q, [...values, eventId], (err, data) => {
          if (err) {
            return res.json(
              `Мероприятие не обновлено. Ошибка ${(err.code, err.message)}`
            );
          } else {
            return res.json(`Мероприятие успешно обновлено`);
          }
        });
    });
    // проверка пользователей
    app.post('/authorization', (req, res) => {
        const q = 'SELECT * FROM authorization WHERE username = ? AND password = ?';
        pool.query(q, [req.body[0].username, req.body[0].password], (err, data) => {
            if (err) {
            return res.json('Error')
            }
            if (data.length > 0) {
            return  res.json('Success')
            } else {
              console.log(err)
            return res.json('No record')
            }
        })
    })
  }

  module.exports = router;  