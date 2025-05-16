// HERO SECTION
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

// Define the color for the animation
const animationColor = '#288569'; // Change this to your desired color

// for intro motion
let mouseMoved = false;

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
};
const params = {
    pointsNumber: 40,
    widthFactor: .3,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }
}

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);

function update(t) {

    // for intro motion
    if (!mouseMoved) {
        pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
        pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.lineCap = "round";
    ctx.strokeStyle = animationColor; // Set the color for the animation
    ctx.lineWidth = 2; // Adjust line width if needed

    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();

    window.requestAnimationFrame(update);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}






























document.querySelectorAll('.clipped-border').forEach(hexagon => {
  hexagon.addEventListener('click', function () {
    const skillContent = document.getElementById('content');

    // Get the clicked skill
    const skill = this.getAttribute('data-skill');

    // Define the details for each skill
    const skillDetails = {
      html: {
        title: 'HTML',
        description: 'HTML is the standard language for creating web pages and web applications.'
      },
      sass: {
        title: 'SASS',
        description: 'SASS is used to style and layout web pages, including the design of fonts, colors, and spacing.'
      },
      javascript: {
        title: 'JavaScript',
        description: 'JavaScript is a versatile programming language used for creating interactive effects within web browsers.'
      },
      python: {
        title: 'Python',
        description: 'Python is a high-level programming language known for its readability and versatility in various applications.'
      },
      git: {
        title: 'Git',
        description: 'Git is a version control system used for tracking changes in source code during software development.'
      },
      django: {
        title: 'Django',
        description: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.'
      },
      linux: {
        title: 'Linux',
        description: 'Linux is a family of open-source Unix-like operating systems based on the Linux kernel.'
      },
      api: {
        title: 'REST APIs',
        description: 'REST APIs allow communication between client and server using HTTP protocols and are widely used for web services and applications.'
      },
      
      docker: {
        title: 'Docker',
        description: 'Docker is a platform for containerizing applications, ensuring consistency across multiple environments and streamlining deployment.'
      },
      
      github: {
        title: 'GitHub',
        description: 'GitHub is a web-based platform for version control and collaboration, enabling developers to manage and share code using Git.'
      },
      
      psql: {
        title: 'PostgreSQL',
        description: 'PostgreSQL is a powerful, open-source relational database management system known for its extensibility and compliance with SQL standards.'
      },
      
      chain: {
        title: 'Networking',
        description: 'Networking involves the design, implementation, and management of computer networks, ensuring secure and efficient communication between devices.'
      },
      
      bootstrap: {
        title: 'Bootstrap',
        description: 'Bootstrap is a popular front-end framework that helps developers build responsive, mobile-first websites quickly using pre-designed components and a grid system.'
      },
      
      jquery: {
        title: 'jQuery',
        description: 'jQuery is a fast, lightweight JavaScript library that simplifies HTML DOM manipulation, event handling, and animations for dynamic web pages.'
      },
      
    };

    // Slide out the current content if already active
    skillContent.classList.remove('slide-in');

    // Use timeout to ensure smooth transition
    setTimeout(() => {
      // Update the content area with the new skill title and description
      skillContent.innerHTML = `
            <h3>${skillDetails[skill].title}</h3>
            <p>${skillDetails[skill].description}</p>
        `;

      // Slide the content back in
      skillContent.classList.add('slide-in');
    }, 300); // Timeout matches the CSS transition duration
  });
});






















  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var form = event.target;
    var data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        alert("Thank you for your message. I will get back to you soon!");
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    });
  });


  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = document.querySelector('.contact-form button');
    button.innerHTML = 'Sending...';

    setTimeout(() => {
        button.innerHTML = 'Send';
        alert('Message sent successfully!');
    }, 2000);
});










document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
    const projectID = this.getAttribute('data-project');
    const projectDetail = document.getElementById('projectDetail');

    // Define detailed content for each project
    const projectDetails = {
      1: {
        title: "Project 1",
        description: "This is a more detailed description of Project 1. It covers the tools used, challenges, and outcomes.",
        githubLink: "https://github.com/user/project1"
      },
      2: {
        title: "Project 2",
        description: "This is a more detailed description of Project 2. It highlights the development process and results.",
        githubLink: "https://github.com/user/project2"
      },
      3: {
        title: "Project 3",
        description: "This is a more detailed description of Project 3. It explains the purpose, features, and learnings.",
        githubLink: "https://github.com/user/project3"
      }
    };

    // Populate the projectDetail section
    projectDetail.innerHTML = `
      <h3>${projectDetails[projectID].title}</h3>
      <p>${projectDetails[projectID].description}</p>
      <a href="${projectDetails[projectID].githubLink}" class="github-link">View on GitHub</a>
    `;

    // Smoothly display the detail section
    projectDetail.classList.add('show-detail');
    projectDetail.scrollIntoView({ behavior: 'smooth' });
  });
});
