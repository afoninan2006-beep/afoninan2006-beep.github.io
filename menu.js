(function () {

  // Назва поточного файлу, наприклад class5.1.html
  var current = decodeURIComponent(location.pathname.split("/").pop()) || "index.html";

  // ===== НАЛАШТУВАННЯ САЙТУ (міняй тут) =====
  var SITE_NAME = "Кібер-Компас";
  var SITE_SUB = "путівник у світі технологій";
  var EMAIL = "afonin@gmail.com";
  var PHONE = "+380 12 345 67 89";
  // ==========================================

  var PLAN_TITLE = "Календарно-тематичне планування";
  var PROGRAM_TITLE = "Модельна навчальна програма";

  // Календарно-тематичне планування: 5-9 клас
  var planPages = [
    { href: "class5.1.html", text: "5 клас" },
    { href: "class6.1.html", text: "6 клас" },
    { href: "class7.1.html", text: "7 клас" },
    { href: "class8.1.html", text: "8 клас" },
    { href: "class9.1.html", text: "9 клас" }
  ];

  // Модельна навчальна програма: 5-6 і 7-9 клас
  var programPages = [
    { href: "program5-6.html", text: "5-6 клас" },
    { href: "program7-9.html", text: "7-9 клас" }
  ];

  // Розділ «Учням»
  var studentPages = [
    { href: "schedule.html", text: "Розклад уроків" },
    { href: "bells.html", text: "Розклад дзвінків" },
    { href: "rules.html", text: "Правила поведінки" },
    { href: "grading.html", text: "Правила оцінювання" },
    { href: "safety.html", text: "Безпека в кабінеті" },
    { href: "schulte.html", text: "Таблиця Шульте" },
    { href: "memory.html", text: "Гра на пам'ять" }
  ];

  // Підручники: 5-9 клас
  var textbooks = [
    { href: "class5.html", text: "5 клас" },
    { href: "class6.html", text: "6 клас" },
    { href: "class7.html", text: "7 клас" },
    { href: "class8.html", text: "8 клас" },
    { href: "class9.html", text: "9 клас" }
  ];

  function has(list) {
    return list.some(function (item) { return item.href === current; });
  }

  var inPlan = has(planPages);
  var inProgram = has(programPages);
  var inMaterials = inPlan || inProgram || current === "materials.html";
  var inStudentPages = has(studentPages);
  var inStudents = inStudentPages || current === "students.html";

  function link(href, text) {
    var cls = (href === current) ? ' class="active"' : "";
    return '<li><a href="' + href + '"' + cls + '>' + text + '</a></li>';
  }

  function subLink(href, text, isActive) {
    var cls = isActive ? ' class="active"' : "";
    return '<li><a href="' + href + '"' + cls + '>' + text + '</a></li>';
  }

  // Випадаючий пункт зі стрілочкою (відкривається кліком): «Підручники»
  function dropdown(label, items) {
    var isActive = has(items);
    var buttonCls = isActive ? "dropdown__button active" : "dropdown__button";

    var list = items.map(function (item) {
      return link(item.href, item.text);
    }).join("");

    return '<li class="dropdown">' +
             '<button type="button" class="' + buttonCls + '" aria-expanded="false">' +
               '<span>' + label + '</span><span class="dropdown__arrow"></span>' +
             '</button>' +
             '<ul class="dropdown__menu">' + list + '</ul>' +
           '</li>';
  }

  // Пункт, який веде на сторінку, а при наведенні показує список
  function hoverMenu(label, href, isActive, items) {
    var cls = isActive ? ' class="active"' : "";

    var list = items.map(function (item) {
      return subLink(item.href, item.text, item.active);
    }).join("");

    return '<li class="dropdown dropdown--hover">' +
             '<a href="' + href + '"' + cls + '>' +
               '<span>' + label + '</span><span class="dropdown__arrow"></span>' +
             '</a>' +
             '<ul class="dropdown__menu">' + list + '</ul>' +
           '</li>';
  }

  // «Навчальні матеріали»
  function materialsMenu() {
    return hoverMenu("Навчальні матеріали", "materials.html", inMaterials, [
      { href: "class5.1.html", text: PLAN_TITLE, active: inPlan },
      { href: "program5-6.html", text: PROGRAM_TITLE, active: inProgram }
    ]);
  }

  // «Учням»
  function studentsMenu() {
    var items = studentPages.map(function (item) {
      return { href: item.href, text: item.text, active: item.href === current };
    });
    return hoverMenu("Учням", "students.html", inStudents, items);
  }

  var html =
    '<header class="header">' +
      '<div class="header__inner">' +

        '<a href="index.html" class="brand" aria-label="На головну">' +
          '<span class="brand__logo"><img src="Images/hedgehog.jpg" alt="Логотип"></span>' +
          '<span class="brand__text">' +
            '<span class="brand__name">' + SITE_NAME + '</span>' +
            '<span class="brand__sub">' + SITE_SUB + '</span>' +
          '</span>' +
        '</a>' +

        '<input type="checkbox" id="menu-toggle" class="menu-toggle">' +
        '<label for="menu-toggle" class="burger" aria-label="Відкрити меню">' +
          '<span></span><span></span><span></span>' +
        '</label>' +

        '<nav class="nav" aria-label="Головне меню">' +
          '<ul class="menu">' +

            link("index.html", "Головна") +

            dropdown("Підручники", textbooks) +
            materialsMenu() +

            studentsMenu() +
            link("tests.html", "Тести") +
            link("links.html", "Корисні посилання") +
            link("about.html", "Про автора") +

          '</ul>' +
        '</nav>' +

      '</div>' +
    '</header>';

  // Вставляємо шапку замість <div id="site-header">
  var place = document.getElementById("site-header");
  if (place) place.outerHTML = html;

  // Бічний список (тільки на сторінках планування та модельної програми)
  function buildSidebar() {
    var section = null;

    if (inPlan) {
      section = {
        title: PLAN_TITLE,
        items: planPages,
        otherHref: "program5-6.html",
        otherText: PROGRAM_TITLE
      };
    } else if (inProgram) {
      section = {
        title: PROGRAM_TITLE,
        items: programPages,
        otherHref: "class5.1.html",
        otherText: PLAN_TITLE
      };
    } else if (inStudentPages) {
      section = {
        title: "Учням",
        items: studentPages,
        backHref: "students.html",
        backText: "Усі розділи для учнів"
      };
    }

    var main = document.querySelector("main.main");
    if (!section || !main) return;

    var items = section.items.map(function (item) {
      return link(item.href, item.text);
    }).join("");

    var aside = document.createElement("aside");
    aside.className = "sidenav";
    aside.innerHTML =
      '<h2 class="sidenav__title">' + section.title + '</h2>' +
      '<ul class="sidenav__list">' + items + '</ul>' +
      (section.otherHref
        ? '<a class="sidenav__other" href="' + section.otherHref + '">' + section.otherText + ' &rarr;</a>'
        : '') +
      '<a class="sidenav__back" href="' + (section.backHref || "materials.html") + '">&larr; ' +
        (section.backText || "Усі навчальні матеріали") + '</a>';

    var wrap = document.createElement("div");
    wrap.className = "layout";
    main.parentNode.insertBefore(wrap, main);
    wrap.appendChild(aside);
    wrap.appendChild(main);
  }

  buildSidebar();

  // Підвал сайту (завжди внизу сторінки)
  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="footer__inner">' +
        '<h2 class="footer__title">Зв\'язок</h2>' +
        '<div class="footer__grid">' +
          '<div>' +
            '<div class="footer__label">Електронна адреса</div>' +
            '<a class="footer__value" href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
          '</div>' +
          '<div>' +
            '<div class="footer__label">Номер телефону</div>' +
            '<a class="footer__value" href="tel:' + PHONE.replace(/\s/g, "") + '">' + PHONE + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer__bottom">© ' + new Date().getFullYear() + ' ' + SITE_NAME + '</div>' +
      '</div>';
    document.body.appendChild(footer);
  }

  buildFooter();

  // Відкриття та закриття списку «Підручники»
  function closeAll() {
    document.querySelectorAll(".dropdown.open").forEach(function (item) {
      item.classList.remove("open");
      item.querySelector(".dropdown__button").setAttribute("aria-expanded", "false");
    });
  }

  document.querySelectorAll(".dropdown__button").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var dropdownEl = button.closest(".dropdown");
      var wasOpen = dropdownEl.classList.contains("open");
      closeAll();
      if (!wasOpen) {
        dropdownEl.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", closeAll);

  document.querySelectorAll(".dropdown__menu").forEach(function (menu) {
    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

})();