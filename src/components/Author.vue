<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2 class="text-center">{{ authorName }}</h2>
          <img :src="authorImage" alt="Author" class="img-fluid rounded mx-auto d-block" />
          <p class="text-center">{{ authorDescription }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AuthorComponent",
    data() {
      return {
        authorName: "Nevena Nikolić, 174/21",
        authorDescription: `Greetings, I am Nevena Nikolić, a 23 year old student that is curently studying 
                            Web programming module on the Internet technologies, a part of the ICT College in Serbia.
                            I come from Pancevo, a city near the capital city of Serbia Belgrade, where i finished 
                            elementary and high school. By enrolling in ICT my decision to tinker with computers was 
                            my way to set a stable future for me, right now in the specter of Web, and who knows what
                            tommorow. By now i have 3 projects that helped me hoan the knowledge that i currently hold, 
                            and use on my wesites.`,
        authorImage: require('@/assets/author.jpg')
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 50px;
  }
  
  img {
    max-width: 100%;
  }
  </style>
  