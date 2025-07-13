import React from 'react';
import { Helmet } from 'react-helmet';

const HowToLogin = () => {
  return (
    <div>
      {/* 🔻 Мета-теги */}
      <Helmet>
        <title>Как войти в аккаунт | Hurry-Scurry</title>
        <meta name="description" content="Инструкция: как войти в аккаунт Genshin Impact, Honkai, и на почту после покупки на Hurry-Scurry." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Как войти в аккаунт | Hurry-Scurry" />
        <meta property="og:description" content="Пошаговая инструкция для входа в аккаунт и почту. Избегайте ошибок при входе!" />
        <meta property="og:image" content="https://hurry-scurry.com/preview.jpg" />
        <meta property="og:url" content="https://hurry-scurry.com/how-to-login" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Как войти в аккаунт Genshin или Honkai" />
        <meta name="twitter:description" content="Узнай, как правильно войти в аккаунт после покупки. Безопасно и просто." />
        <meta name="twitter:image" content="https://hurry-scurry.com/preview.jpg" />
      </Helmet>

      <div className="text-gray-300 w-full">
        <div className="text-2xl">
          <ul className="ml-25">
            <li className="ml-25">
              <h3 className="mt-5 text-3xl font-bold">1. Как войти в аккаунт Genshin Impact или Honkai</h3>
              <p className="mt-3">
                После покупки вы получите данные от аккаунта и данные от почты:
              </p>
              <p className="mt-3">
                Для входа в игру используйте логин и пароль от игры (не от почты).
              </p>
              <p className="mt-3">
                Будьте особенно внимательны при вводе пароля — даже одна ошибка может привести к блокировке.
              </p>

              <div className="border-l-4 border-yellow-500 pl-4 mt-4 italic text-yellow-300">
                ⚠️ <br />
                <strong>Важно:</strong> <br />
                <strong>не вводите пароль от почты!</strong>
              </div>
            </li>

            <li className="ml-25 mt-8">
              <p className="mt-3">
                Если вы введёте данные неправильно более двух раз, может появиться ошибка «Слишком много попыток».
              </p>
              <p className="mt-3">
                В таком случае, доступ к аккаунту будет временно заблокирован, и вам придётся подождать <strong>до 7 дней</strong> перед следующей попыткой.
              </p>
            </li>

            <li className="ml-25 mt-8">
              <h3 className="text-3xl font-bold">2. Как войти на почту</h3>
              <p className="mt-3">
                Для входа на почту используйте сайт, указанный в полученном письме с данными от аккаунта.
              </p>
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li>Перейдите на сайт: <a href="https://login.live.com/" className="text-blue-400 underline">https://login.live.com/</a></li>
                <li>Введите почту и пароль, указанные в заказе.</li>
                <li>После входа перейдите во вкладку "Входящие", чтобы получить письма.</li>
              </ol>
            </li>

            <li className="ml-25 mt-8">
              <h3 className="text-3xl font-bold">3. После входа в почту</h3>
              <p className="mt-3">
                Когда войдёте в почту, перейдите во вкладку с письмами. туда придет письмо с кодом/подтверждением.
              </p>
            </li>

            <li className="ml-25 mt-8">
              <div className="border-l-4 border-yellow-500 pl-4 mt-3 italic text-yellow-300">
                ⚠️ Пожалуйста, внимательно проверяйте введённые данные при входе в игру. Это поможет избежать ошибки
                “Слишком много попыток”, после которой доступ к аккаунту может быть временно ограничен.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowToLogin;