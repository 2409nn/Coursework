localStorage.setItem("userPassword", "qwerty123");
localStorage.setItem("userEmail", "A.iskander07@gmail.com");
localStorage.setItem("projects", ["Fitness app", "SaaS dashboard"]);

localStorage.setItem("project_fitness app", JSON.stringify({
    name: "Fitness app",
    description: `Fitness App – Your personal digital trainer. Track workouts, follow custom plans, monitor progress,
     and optimize nutrition. Suitable for all fitness levels. Achieve goals with guided exercises, performance analytics,
      and adaptive training. Convenient, effective, and always accessible. Stay motivated and transform your fitness journey.`,
    imageURL: "../imgs/main/project__image.jpg",
    members: ["Cave Johnson", "Tony Stark", "Heisenberg"],
    weekProgress: "68%",
    monthProgress: "41%"
}))

localStorage.setItem("project_saas dashboard", JSON.stringify({
    name: "SaaS dashboard",
    description: `SaaS Dashboard – A centralized cloud-based control panel to monitor, analyze, and manage your business
     operations. Real-time data visualization, customizable reports, user management, and integrations. Streamline 
     workflows, track KPIs, and make data-driven decisions from anywhere. Scalable, secure, and designed for efficiency.`,
    imageURL: "../imgs/main/project__image.jpg",
    members: ["Cave Johnson", "Tony Stark", "Heisenberg"],
    weekProgress: "79%",
    monthProgress: "38%"
}))

localStorage.setItem("task1", JSON.stringify({
    title: "Task 1",
    time: "11:00",
    project: "project 1"
}))

localStorage.setItem("task2", JSON.stringify({
    title: "Task 2",
    time: "12:00",
    project: "project 2"
}))

localStorage.setItem("task1", JSON.stringify({
    title: "Task 3",
    time: "13:00",
    project: "project 1"
}))

localStorage.setItem("task2", JSON.stringify({
    title: "Task 4",
    time: "14:00",
    project: "project 2"
}))