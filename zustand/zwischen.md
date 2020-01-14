    function draw() {
      switch (state) {
        case "WELCOME":
          welcome();
          break;
        case "PLAY":
          play();
          break;
      } 
    }

    function welcome() {
      background(120);
      textSize(20);
      textAlign(CENTER);
      text("Welcome to SimplePong\n\n",0,100,width,20);
      textSize(16);
      text("Move paddle with \nleft and right arrow-key \n\nENTER to start",0,140,width,80);
    }

        function keyPressed() {
      if (state === "WELCOME" && keyCode === ENTER) {
        state = "PLAY";
      }
    }