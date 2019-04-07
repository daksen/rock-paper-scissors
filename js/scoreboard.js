(function () {
   'use strict';
   // -----------------------------------------------
   // Elements
   
   var scoreboardElm = document.querySelector('.scoreboard');
   var scoreHeaderBackgroundElm = document.querySelector('.score-header-background');
   var logoElm = document.querySelector('.score-header-background__logo');
   var playerRowElms = document.querySelectorAll('.player-row');
   var headerTitleElms = [
      document.querySelector('.score-header-foreground__left .score-header-foreground__score'),
      document.querySelector('.score-header-foreground__right .score-header-foreground__score'),
      document.querySelector('.score-header-foreground__left .score-header-foreground__win'),
      document.querySelector('.score-header-foreground__right .score-header-foreground__win'),
      document.querySelector('.score-header-foreground__left .score-header-foreground__title'),
      document.querySelector('.score-header-foreground__right .score-header-foreground__title')
   ];

   // -----------------------------------------------
   // Animation Functions

   function setupAnimations() {
      scoreboardElm.classList.add('anim__fade-out');
      scoreHeaderBackgroundElm.classList.add('anim__skew');
      scoreHeaderBackgroundElm.classList.add('anim__header');
      logoElm.classList.add('anim__logo-entry');
      logoElm.classList.add('anim__logo-center');

      for (var i = 0; i < headerTitleElms.length; i++) {
         headerTitleElms[i].classList.add('anim__header-title');
      }

      for (var i = 0; i < playerRowElms.length; i++) {
         playerRowElms[i].classList.add('anim__player-row');
      }
   }

   function playAnimation() {
      setupAnimations();
      delayedExecution([{
            delay: 250 + 50,
            fn: animateLogoEntry
         },
         {
            delay: 250 + 3250,
            fn: animateHeader
         },
         {
            delay: 250 + 3750,
            fn: animateHeaderTitles
         },
         {
            delay: 250 + 4500,
            fn: animateSkew
         },
         {
            delay: 250 + 4650,
            fn: animateLogoCenter
         },
         {
            delay: 250 + 4850,
            fn: animatePlayerRows
         }
      ]);
   }

   function replayAnimation() {
      replayButtonElm.disabled = true;
      delayedExecution([{
            delay: 0,
            fn: animateFadeOut
         },
         {
            delay: 750,
            fn: playAnimation
         }
      ]);
   }

   function animateSkew() {
      animateElement(scoreHeaderBackgroundElm, 'anim__skew', 150);
   }

   function animateHeader() {
      animateElement(scoreHeaderBackgroundElm, 'anim__header', 250);
   }

   function animateHeaderTitles() {
      for (var i = 0; i < headerTitleElms.length; i++) {
         setTimeout(animateHeaderTitle.bind(null, headerTitleElms[i]), 60 * i);
      }
   }

   function animateHeaderTitle(titleElem) {
      animateElement(titleElem, 'anim__header-title', 250);
   }

   function animateLogoEntry() {
      animateElement(logoElm, 'anim__logo-entry', 3000);
   }

   function animateLogoCenter() {
      animateElement(logoElm, 'anim__logo-center', 250);
   }

   function animatePlayerRows() {
      for (var i = 0; i < playerRowElms.length; i++) {
         setTimeout(animatePlayerRow.bind(null, playerRowElms[i]), 175 * i);
      }
   }

   function animatePlayerRow(rowElm) {
      animateElement(rowElm, 'anim__player-row', 325);
   }

   function animateFadeOut() {
      animateElement(scoreboardElm, 'anim__fade-out', 500);
   }

   // -----------------------------------------------
   // Utility Functions

   function animateElement(element, className, duration) {
      element.classList.remove(className);
      element.classList.add(className + '--during');
      setTimeout(function () {
         element.classList.remove(className + '--during');
      }, duration + 100);
   }

   function delayedExecution(taskArray) {
      for (var i = 0; i < taskArray.length; i++) {
         setTimeout(function (fn, args) {
            fn.apply(null, args);
         }.bind(null, taskArray[i].fn, taskArray[i].args), taskArray[i].delay);
      }
   }

   // -----------------------------------------------
   // Run
   playAnimation();
})();