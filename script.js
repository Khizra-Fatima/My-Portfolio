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
      drf: {
        title: 'Django Rest Framework',
        description: 'Built robust RESTful APIs with DRF, focusing on authentication, serialization, permissions, and efficient data handling.'
      },

      databases: {
        title: 'Databases (PostgreSQL, MySQL, SQLite)',
        description: 'Practiced PostgreSQL and MySQL, and used SQLite in real projects for development and testing; familiar with CRUD, joins, and indexing.'
      },

      python: {
        title: 'Python (OOP Included)',
        description: 'Strong command of Python, including object-oriented programming principles and clean, modular code practices.'
      },

      django: {
        title: 'Django',
        description: 'Developed full-stack web apps using Django, leveraging its built-in features for scalability, security, and rapid development.'
      },

      permission: {
        title: 'Django Guardian / Permissions',
        description: 'Applied object-level permissions with Django Guardian to control access across user roles in real-world apps.'
      },

      auth: {
        title: 'Authentication',
        description: 'Implemented secure login systems including session-based and token-based (JWT) authentication with role-specific access.'
      },

      dbdesign: {
        title: 'Database Design',
        description: 'Skilled in structuring normalized, scalable databases with proper relationships and integrity constraints.'
      },

      linux: {
        title: 'Linux (Ubuntu)',
        description: 'Comfortable using the terminal for navigation, system operations, and environment management in Linux (Ubuntu).'
      },

      docker: {
        title: 'Docker (Learning)',
        description: 'Learning to containerize apps using Docker for consistent development and production environments.'
      },

      git: {
        title: 'Git',
        description: 'Version-controlled all codebases with Git, using branches, commits, and merges to manage development efficiently.'
      },

      deployement: {
        title: 'Deployement (EC2, GitHub Pages)',
        description: 'Deployed Django apps using AWS EC2 and static projects on GitHub Pages with basic CI/CD workflows.'
      },

      github: {
        title: 'GitHub',
        description: 'Utilized GitHub for code hosting, team collaboration, and managing open-source and personal project repositories.'
      },

      postman: {
        title: 'Postman (Learning)',
        description: 'Exploring Postman for testing APIs, working with requests, and managing authentication headers and environments.'
      },

      nggun: {
        title: 'Nginx & Gunicorn',
        description: 'Configured Nginx as a reverse proxy with Gunicorn to serve production Django applications.'
      },

      bootstrap: {
        title: 'Bootstrap',
        description: 'Rapidly prototyped and styled responsive pages with Bootstrap’s grid system and components.'
      },

      javascript: {
        title: 'JavaScript',
        description: 'Used JavaScript for DOM manipulation, dynamic UI elements, and basic interactivity in full-stack projects.'
      },

      css: {
        title: ' CSS',
        description: 'Styled web pages using CSS3, with solid understanding of layout systems like Flexbox and Grid for responsive design.'
      },

      html: {
        title: 'HTML',
        description: 'Built responsive and accessible pages using semantic HTML5 structures.'
      },

      sass: {
        title: 'Sass',
        description: 'Used Sass for modular, maintainable stylesheets with features like nesting, variables, and partials in larger projects.'
      },

      uiux: {
        title: 'UI/UX Design (Basic)',
        description: 'Designs clean and intuitive user interfaces with attention to spacing, alignment, readability, and user flow in full-stack apps.'
      },

      react: {
        title: 'React (Planned)',
        description: 'Planned to explore component-based development with React for building dynamic, interactive frontend interfaces.'
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






















document.getElementById('contactForm').addEventListener('submit', function (event) {
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


document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const button = document.querySelector('.contact-form button');
  button.innerHTML = 'Sending...';

  setTimeout(() => {
    button.innerHTML = 'Send';
    alert('Message sent successfully!');
  }, 2000);
});










document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    const projectID = this.getAttribute('data-project');
    const projectDetail = document.getElementById('projectDetail');


    // Define detailed content for each project
    const projectDetails = {
      1: {
        title: "MeBlog – A Multi-User Blogging Platform",
        description: "Blogify is a Django-powered blogging application that supports user-authored content, robust CRUD functionality, interactive comments, and category-based post organization. With Django Guardian for fine-grained permissions and Summernote for rich-text editing, the platform ensures both flexibility for writers and an intuitive reading experience. Built with a mobile-first approach, the application combines solid backend logic with clean, responsive design.",
        image: "Images/image1.jpg",
        features: [
          "Implemented full user authentication system (register, login, logout)",
          "Built CRUD operations for posts with user-specific permissions",
          "Enabled rich-text editing using Summernote and content sanitization with Bleach",
          "Developed a comment system with edit/delete rights for users",
          "Added likes/dislikes functionality for engagement",
          "Designed a responsive layout using SASS and ensured mobile-friendliness",
          "Structured categories for organized blog discovery",
          "Managed static files and media uploads (Pillow)",
          "Integrated role-based access using Django Guardian"
        ],
        techstack: [
          "Backend: Django, Django Guardian, Django Summernote, SQLite, Pillow",
          "Frontend: HTML, SASS (CSS preprocessor), Bootstrap, JavaScript",
          "Other Tools: Bleach (for content sanitization), Git, GitHub"
        ],
        statusNote: "",
        githubLink: "https://github.com/user/project1",
        livedemolink: "https://github.com/user/project1"
      },
      2: {
        title: "Ecommerce-Platform – A Scalable Multi-Vendor E-commerce Platform",
        description: "This is a more detailed description of ProShopHub is a feature-rich, multi-vendor e-commerce platform built with Django. It offers distinct dashboards for administrators, sellers, and customers, facilitating efficient management of products, orders, and user interactions. The platform supports role-based access, social authentication, and integrates essential tools like Stripe for payments and Django Guardian for fine-grained permissions. With a responsive design and modular architecture, ShopHub ensures scalability and a user-friendly experience across devices.",
        image: "Images/image2.jpg",
        features: [
          {
            title: "🔐 User Accounts & Authentication",
            items: [
              "Custom user model with email/password login.",
              "Role-based registration: Choose to register as a Seller or Customer (separate accounts required).",
              "Role isolation: Customers and Sellers have distinct permissions and dashboards.",
              "Social login via Facebook for quick onboarding.",
              "Profile management: Edit image, password, and email.",
              "Access control enforced with django-guardian."
            ]
          },
          {
            title: "👥 Multi-Dashboard System",
            items: [
              "Customer Dashboard: Manage profile, cart, orders, wishlist, reviews, and messages.",
              "Seller Dashboard: Manage profile, products, orders, reviews, messages, and store settings.",
              "Co-admin Dashboard: View platform stats, manage users, products, and orders."
            ]
          },
          {
            title: "🛍️ Product Management",
            items: [
              "Sellers can add/edit/delete products with details like title, description, dimensions, tags, colors, materials, and more.",
              "Draft mode or instant publish.",
              "Product detail page is publicly accessible for browsing and ordering."
            ]
          },
          {
            title: "🧾 Order Management",
            items: [
              "Customer-friendly ordering process: Auto-fill profile info, choose delivery method, quantity, and color.",
              "Review full cost breakdown before confirming.",
              "Order success confirmation page.",
              "Order tracking for customers and order status updates by sellers.",
              "Dedicated order detail view for both parties.",
              "Customers can delete their order history selectively or entirely."
            ]
          },
          {
            title: "🛒 Shopping Cart",
            items: [
              "Customers can add products to cart with specific variants (color, quantity).",
              "Cart management: View all items, remove individually or clear all."
            ]
          },
          {
            title: "⭐ Reviews",
            items: [
              "Verified customers can leave reviews after delivery.",
              "Edit/delete reviews.",
              "Reviews are shown on product detail pages and seller dashboards."
            ]
          },
          {
            title: "📌 Activities (Wishlist, Messaging & Notifications)",
            items: [
              "Wishlist: Save products to personal wishlist and manage from dashboard.",
              "Notifications system: (In progress) Mark-as-read functionality included.",
              "Messaging System: One-way initiation by customers, inbox view, threaded messages, WebSocket integration planned."
            ]
          },
          {
            title: "🤖 Chatbot",
            items: [
              "Predefined response system using keyword → intent → response.",
              "Includes fallback response for unmatched queries."
            ]
          },
          {
            title: "🌐 Public Pages",
            items: [
              "Homepage with featured content.",
              "Explore page listing all products.",
              "Filter by tags, materials, colors, and more.",
              "Lazy loading (8 products at a time)."
            ]
          },
          {
            title: "💳 Payments (Coming Soon)",
            items: [
              "Payment system currently in progress due to limitations in local providers.",
              "Planning to integrate popular methods based on regional availability."
            ]
          }
        ],
        techstack: [
          "Backend: Python, Django, Django REST Framework, Django Guardian (object-level permissions), SQLite, Social Auth (Facebook login), Whitenoise (static file management)",
          "Frontend: HTML, SASS (CSS preprocessor), Bootstrap, JavaScript",
          "Other Tools: Pillow (image handling), Crispy Forms (form rendering), Bleach (content sanitization), Git, GitHub"
        ],
        statusNote: "",
        githubLink: "https://github.com/user/project2",
        livedemolink: "https://github.com/user/project1"
      },
      3: {
        title: "Connectly – A Social Media App (In Development)",
        description: "Connectly is a full-featured social media platform designed to foster meaningful conversations and community engagement. Users can share posts, follow others, message in real-time, and explore trending content – all through a sleek, mobile-responsive interface. The project focuses on privacy, scalability, and user experience, built with Django and Django REST Framework.",
        image: "Images/connectly.png",
        features: [
          "User authentication with social login (Google, Facebook)",
          "Create, like, share, and comment on posts",
          "Follow/unfollow users and explore trending content",
          "Real-time messaging and notifications",
          "User profiles with bio, avatar, and activity stats",
          "Content moderation and reporting system",
          "Hashtag and topic-based content discovery"
        ],
        techstack: [
          "Backend: Django, Django REST Framework, Channels (for WebSockets)",
          "Frontend: HTML, SCSS, JavaScript (React – Planned)",
          "Database: PostgreSQL (SQLite for dev)",
          "Tools: Git, GitHub, Celery, Redis, Cloudinary (for media uploads)"
        ],
        statusNote: "🚧 Currently under active development. Frontend integration and core social features are being built. Private beta expected by July 2025.",
        githubLink: "https://github.com/user/project3",
        livedemolink: "Coming Soon"
      }
    };


    const project = projectDetails[projectID]; // Get the current project object
    const featureList = (() => {
      if (!project.features) return "<li>No features listed.</li>";

      // Case 1: Flat list (e.g., Project 1)
      if (typeof project.features[0] === "string") {
        return project.features.map(feature => `<li>${feature}</li>`).join("");
      }

      // Case 2: Sectioned list (e.g., Project 2)
      return project.features.map(section => `
        <div class="feature-section">
          <strong class='feature-title'>${section.title}</strong>
          <ul>
            ${section.items.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      `).join("");
    })();
    
    const techstacklist = project.techstack
      ? project.techstack.map(onestack => `<li>${onestack}</li>`).join("")
      : "<li>No Tech Stack listed.</li>"; // fallback if no techstack


    // Populate the projectDetail section
    projectDetail.innerHTML = `
      <h3>${projectDetails[projectID].title}</h3>
      <p>${projectDetails[projectID].description}</p>
      <img src="${project.image}" alt="${project.title}" class="project-detail-img">
      <h5>Key Features:</h5>
      <ul class=project-features>${featureList}</ul>
      <h5>Tech Stack:</h5>
      <ul class=project-techstack>${techstacklist}</ul>
      <p>${projectDetails[projectID].statusNote}</p>
      <a href="${projectDetails[projectID].githubLink}" class="github-link">View on GitHub</a>
      <a href="${projectDetails[projectID].livedemolink}" class="livedemo-link">Live Demo</a>
    `;

    // Smoothly display the detail section
    projectDetail.classList.add('show-detail');
    projectDetail.scrollIntoView({ behavior: 'smooth' });
  });
});
