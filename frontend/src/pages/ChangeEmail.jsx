import React from 'react';
import { Helmet } from 'react-helmet';

const ChangeEmail = () => {
  return (
    <div className="text-gray-300 w-full">
      {/* 🔻 Мета-теги */}
      <Helmet>
        <title>Как сменить почту в Genshin Impact | Hurry-Scurry</title>
        <meta name="description" content="Пошаговая инструкция по смене привязанной почты на аккаунте Genshin Impact через сайт HoYoverse." />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Как сменить почту в Genshin Impact" />
        <meta property="og:description" content="Пошаговое руководство: как изменить привязку электронной почты на аккаунте Genshin. Безопасно и просто." />
        <meta property="og:image" content="https://hurry-scurry.com/preview.jpg" />
        <meta property="og:url" content="https://hurry-scurry.com/change-email" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Как сменить почту на аккаунте Genshin Impact" />
        <meta name="twitter:description" content="Узнай, как легко изменить почту на своём аккаунте после покупки на Hurry-Scurry." />
        <meta name="twitter:image" content="https://hurry-scurry.com/preview.jpg" />
      </Helmet>

      <h1 className="text-4xl text-gray-300 mb-5 ml-25">
        Как сменить почту на аккаунте Genshin Impact
      </h1>
      <div className="mt-5 text-2xl ml-25 space-y-4">
        <p><strong>1. Перейдите на официальный сайт HoYoverse:</strong></p>
        <p>
          <a
            href="https://account.hoyoverse.com/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            https://account.hoyoverse.com/
          </a>
        </p>

        <p><strong>2. Войдите в аккаунт, используя данные, выданные после покупки</strong></p>
        <p>– Введите логин и пароль, полученные в заказе.</p>

        <p><strong>3. Перейдите в раздел “Настройки безопасности учётной записи”</strong></p>
        <p>– Нажмите на кнопку <strong>«Привязать электронную почту»</strong>.</p>

        <p><strong>4. Если почта уже привязана — выберите опцию «Изменить привязку»</strong></p>
        <p>– Нажмите <strong>«Сменить привязку»</strong>, чтобы привязать свою почту.</p>

        <p><strong>5. Отправьте код подтверждения на текущую привязанную почту</strong></p>
        <p>– Нажмите кнопку <strong>«Отправить код»</strong>.</p>

        <p><strong>6. Зайдите в почтовый ящик</strong></p>
        <p>– Перейдите на сайт почты по ссылке, полученной в заказе</p>
        <p>– Введите указанную почту и пароль</p>
        <p>– Скопируйте код из письма.</p>

        <p><strong>7. Укажите свою новую почту и подтвердите её кодом</strong></p>
        <p>– Введите адрес своей почты</p>
        <p>– Подтвердите, и смена будет завершена ✅</p>
      </div>
    </div>
  );
};

export default ChangeEmail;