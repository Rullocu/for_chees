export const sectionConfig = [
    {
      path: "/",
      background: "ssection0.jpg",
      content: {
        style: {
          backgroundColor: "rgb(255, 121, 215)",
          borderRadius: "20px",
          padding: "40px",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "800px"
        },
        titleStyle: {
          fontSize: "2.5rem",
          color: "rgb(255, 255, 255)",
          fontFamily: "'Georgia', serif"
        },
        title: "Do you want to hear a story?",
        buttonText: "Tell me the story!"
      }
    },
    {
      path: "/1",
      background: "section0.jpg",
      // This section has no content, just background and navigation
    },
    {
      path: "/2",
      background: "section1.jpg",
      // This section has no content, just background and navigation
    },
    {
      path: "/section2",
      background: "section2.jpg",
      content: {
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "12px",
          padding: "30px",
          position: "absolute",
          top: "30%",
          right: "10%",
          maxWidth: "400px"
        },
        titleStyle: {
          fontSize: "2.5rem",
          color: "#ffd700",
          fontFamily: "'Georgia', serif"
        },
        textStyle: {
          fontSize: "1.1rem",
          color: "#ffffff",
          lineHeight: "1.8"
        },
        title: "Section 2",
        text: "This section has content with custom styling."
      }
    }
  ];