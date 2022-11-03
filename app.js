const express = require('express') /* Подключение модуля express. Express (фреймворк) - который реализовывает некоторые функции, необходимых для создания приложений и API. */
const path = require('path') /* Подключение модуля path. Модуль Path обеспечивает способ работы с каталогами и путями файлов. */
const {v4} = require('uuid') /*uuid -Генерирует различные форматы ID */
const app = express() /* Запускаем модуль Express, данной функцией, в переменной app */

let CONTACTS = [
  {id: v4(), name: 'Victor', value: '+37369669676', marked: false}
  /* Выводит массив с данными которые отображаються на странице, id: v4() - создает рандомный id */
]

app.use(express.json())

// GET - получаем данные
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS) // статус 200 + метод json
  }, 1000)
})

// POST - вызываем метод, для создание нового контакта
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false} // наш обьект
  CONTACTS.push(contact)
  res.status(201).json(contact) // статус 201 говорит что элемент создан
})

// DELETE - для удаление записей
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
  res.status(200).json({message: 'Контакт был удален'}) // статус 200 (+ сообщения) говорит что элемент создан
})

// PUT - обновляет/изменияем элемент (то есть отмечаем контакт)
app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id === req.params.id) //находим индекс
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})


app.use(express.static(path.resolve(__dirname, 'client')))//передаем путь папки, чтобы сделать ее статической

app.get('*', (req, res) => {   // отслеживание любыч get запросов которые есть
  res.sendFile(path.resolve(__dirname, 'client', 'index.html')) // указываем путь до файла index.html
})

/*
 Запуск сервера методом .listen (указываем порт 3000 на котором будет запущен сервер)
 В console.log выведим сообщение "Server has been started on port 3000..." если сервер успешно запущен.
 */
app.listen(3000, () => console.log('Server has been started on port 3000...')) 

