<template>
    <div class="question-container">
      <div class="question-inner" v-html="question">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChatQuestion',
    props: {
      question: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style>
  .question-container {
    text-align: right;
  }
  
  .question-inner {
    display: inline-flex;
    max-width: 754px;
    padding: 12px 20px;
    margin-top: 12px;
    margin-bottom: 0px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 24px;
    background: #9747FF;
  
    color: #FFF;
    font-size: 16px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.5px;
  }
  
  </style>