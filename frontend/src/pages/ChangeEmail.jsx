import React from 'react'

const ChangeEmail = () => {
  return (
    <div>
      <div className="text-gray-300 w-full">
        <h1 className="text-4xl text-gray-300 mb-5 ml-25">Как сменить почту на аккаунте геншин импакт</h1>
        <p className="ml-25 text-2xl">Инструкция по смене почты</p>
        <div className="mt-5 text-2xl">
            <ul className="ml-25s">
                <li className="ml-25">
                    <div className="ml-25">1. Переходим по ссылке на сайт игры <a href="https://account.hoyoverse.com" rel="noreferrer" target="_blank">https://account.hoyoverse.com</a></div>
                </li>
                <li className="ml-25">
                    <div className="ml-25">2. Вводим данные, которые выдались после покупки Логин:Пароль</div>
                    <p><img className='mt-15'  alt="Вводим логин и пароль" src="https://i.imgur.com/RvYdGmF.png"/></p>
                </li>
                <li className="ml-25">
                    <div className="ml-25">3. Переходи в раздел "Настройки безопасности учётной записи" и нажимаем привязать Электронную почту</div>
                    <p><img className='mt-15'  alt="раздел Настройки безопасности учётной записи" src="https://i.imgur.com/nF6071v.png"/></p>
                </li>
                <li className="ml-25">
                    <div className="ml-25">4. Если уже привязана Электронная почта, то нажимаем "Сменить привязку"</div>
                    <p><img className='mt-15'  alt="Сменить привязку" src="https://i.imgur.com/28t3NlZ.png"/></p>
                </li>
                <li className="ml-25">
                    <div className="ml-25">4. Откроется окно где нужно будет отправить код на почту, нажимаем "Отправить"</div>
                    <p><img className='mt-15'  alt="Отправить код" src="https://i.imgur.com/AE5OMaS.png"/></p>
                </li>
                <li className="ml-25">
                    <div className="ml-25">5. Заходим на сайт <a href="https://mail.rambler.ru/" target="_blank">mail.rambler.ru</a> используя те же данные что и от игры и копируем полученный КОД.</div>
                    <p><img className='mt-15'  alt="Заходим в почту" src="https://i.imgur.com/USMK5Zn.png"/></p>
                </li>
                <li className="ml-25">
                    <div className="ml-25">6. Далее у вас откроется окно, где нужно будет указать вашу Почту и подтвердить её! Готово!</div>
                    <p><img className='mt-15'  alt="Привязка своей почты" src="https://i.imgur.com/XmpHmTN.png"/></p>
                </li>

            </ul>
        </div>
    </div>
    </div>
  )
}

export default ChangeEmail
