
// ==UserScript==
// @name           西南网教(辅助答题)
// @namespace      west-homework
// @version        0.0.1
// @description    西南网教答题助手
// @include        *://zuoye.eduwest.com/homeworkquestions/*
// @run-at         document-end
// @require        https://code.jquery.com/jquery-3.6.0.min.js
// @author         zax
// @license        MIT
// ==/UserScript==
(function () {
  'use strict';

  //单选题元素(input name="danxuanti")
  const checkElements = $("[name=danxuanti]");
  const radioElements = $("[name=panduanti]"); //本题参考答案

  let innerTextNow = $('#button')[0].children[1].innerText;
  let nextBtn = $('#next')[0]; //下一页

  let submitBtn = $('#preservation1')[0]; //提交
  //多选题元素

  const checkboxElements = $('#duoxuantiyz .duxt input');
  const mapping = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5
  }; //单选题
  //点击第一个

  if (checkElements.length) {
    console.log("单选"); //是单选题(第一次标记)

    let flag = Array.prototype.every.call(checkElements, item => !item.checked);

    if (flag) {
      //未点击过
      checkElements[0].click(); //点第一个
      //点击提交

      submitBtn.click();
    } else {
      //先判断是否做完,出现参考答案,已提交的肯定做完的,
      let currentIndex = Array.prototype.findIndex.call(checkElements, item => item.checked);

      if (innerTextNow.indexOf('本题参考答案') > -1) {
        //判断答案是否正确,正确在点击下一页,否则,点击正确答案
        function submit(idx) {
          checkElements[idx].click();
          submitBtn.click();
        }

        switch (innerTextNow.slice(-1)) {
          case 'A':
            currentIndex == 0 ? nextBtn.click() : submit(0);
            break;

          case 'B':
            currentIndex == 1 ? nextBtn.click() : submit(1);
            break;

          case 'C':
            currentIndex == 2 ? nextBtn.click() : submit(2);
            break;

          case 'D':
            currentIndex == 3 ? nextBtn.click() : submit(3);
            break;
        }
      } else {
        //点击过,但是没有点击对,点击当前项目的下一个
        checkElements[currentIndex + 1].click(); //点击提交

        console.log('按顺序点击');
        submitBtn.click();
      }
    }
  } else if (checkboxElements.length) {
    //多选
    console.log("多选"); //是否出现正确
    // let innerTextPan = $('#duoxuantiyz span')[1].innerText

    let innerTextPan = $('#duoxuantiyz span'); //>2才有提示

    if (innerTextPan.length > 1 && innerTextPan[1].innerText.indexOf('正确') > -1) {
      //点击下一页
      console.log('下一页');
      nextBtn.click();
    } else {
      if (innerTextNow.indexOf('本题参考答案') > -1) {
        //将答案取出来,遍历点击后,提交,出现正确,下一页
        let arr = innerTextNow.slice(8).split(' ');
        arr.map(item => {
          if (!checkboxElements[mapping[item]].checked) {
            checkboxElements[mapping[item]].click();
          }
        }); //判断第一个是否需要点击

        let flag1 = arr.some(item => item == 'A');

        if (flag1) {
          checkboxElements[0].checked ? '' : checkboxElements[0].click();
        } //提交


        submitBtn.click(); // nextBtn.click()
      } else {
        //按照数组遍历点击
        //点击第一个
        let flag = Array.prototype.every.call(checkboxElements, item => !item.checked);

        if (flag) {
          checkboxElements[0].click();
        } //提交


        submitBtn.click();
      }
    }
  } else if (radioElements.length) {
    //判断题
    console.log("判断"); //是单选题(第一次标记)

    let flag = Array.prototype.every.call(radioElements, item => !item.checked);

    if (flag) {
      //未点击过
      console.log('点第一个');
      radioElements[0].click(); //点第一个
      //点击提交

      submitBtn.click();
    } else {
      //先判断是否做完,出现参考答案,已提交的肯定做完的,
      let innerTextPan = $('#shiti_1 span');

      if (innerTextPan.length > 1 && innerTextPan[1].innerText.indexOf('正确') > -1) {
        //点击下一页
        console.log('下一页');
        nextBtn.click();
      } else {
        //点击过,但是没有点击对,点击当前项目的下一个
        let currentIndex = Array.prototype.findIndex.call(radioElements, item => item.checked);

        if (currentIndex == 0) {
          console.log('切换第二个');
          radioElements[1].click();
        } else {
          console.log('切换第一个');
          radioElements[0].click();
        } //点击提交


        console.log('按顺序点击');
        submitBtn.click();
      }
    }
  } else {
    //问答题
    //stop
    console.log('自己写');
  }

})();
