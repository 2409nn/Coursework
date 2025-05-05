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

// данные для линейного графика

localStorage.setItem("januaryLinData", JSON.stringify([
    [60, 90, 45, 85, 30],
    [75, 40, 80, 35, 90],
    [20, 95, 50, 70, 40],
]));

localStorage.setItem("februaryLinData", JSON.stringify([
    [40, 85, 30, 75, 20],
    [90, 35, 80, 25, 70],
    [60, 45, 90, 40, 85],
]));

localStorage.setItem("marchLinData", JSON.stringify([
    [30, 95, 20, 85, 15],
    [80, 25, 70, 35, 90],
    [45, 85, 25, 75, 30],
]));

localStorage.setItem("aprilLinData", JSON.stringify([
    [65, 30, 70, 20, 80],
    [40, 75, 25, 85, 35],
    [90, 30, 60, 25, 70],
]));

localStorage.setItem("mayLinData", JSON.stringify([
    [80, 35, 90, 30, 100],
    [25, 95, 20, 85, 15],
    [70, 40, 80, 25, 75],
]));

localStorage.setItem("juneLinData", JSON.stringify([
    [50, 85, 30, 80, 35],
    [20, 95, 25, 90, 40],
    [60, 30, 70, 20, 75],
]));

localStorage.setItem("julyLinData", JSON.stringify([
    [85, 25, 90, 30, 95],
    [35, 80, 20, 85, 25],
    [75, 30, 70, 40, 65],
]));

localStorage.setItem("augustLinData", JSON.stringify([
    [60, 20, 70, 25, 80],
    [30, 90, 35, 85, 40],
    [50, 100, 20, 95, 25],
]));

localStorage.setItem("septemberLinData", JSON.stringify([
    [45, 85, 30, 90, 20],
    [70, 25, 75, 35, 80],
    [60, 40, 65, 30, 70],
]));

localStorage.setItem("octoberLinData", JSON.stringify([
    [55, 35, 65, 30, 75],
    [25, 70, 20, 80, 30],
    [60, 25, 85, 40, 90],
]));

localStorage.setItem("novemberLinData", JSON.stringify([
    [90, 30, 85, 35, 80],
    [25, 75, 20, 70, 15],
    [60, 40, 55, 45, 50],
]));

localStorage.setItem("decemberLinData", JSON.stringify([
    [50, 20, 55, 25, 60],
    [30, 85, 35, 80, 40],
    [70, 25, 75, 20, 80],
]));



// данные для столбчатого графика

localStorage.setItem("januaryBarData", JSON.stringify([
    [80, 65, 70, 75, 90],
    [78, 68, 88, 68, 66],
    [79, 89, 69, 89, 79],
]));

localStorage.setItem("februaryBarData", JSON.stringify([
    [65, 60, 70, 68, 72],
    [74, 72, 70, 68, 76],
    [80, 82, 84, 78, 81],
]));

localStorage.setItem("marchBarData", JSON.stringify([
    [70, 72, 75, 78, 80],
    [68, 70, 74, 72, 69],
    [85, 80, 78, 84, 83],
]));

localStorage.setItem("aprilBarData", JSON.stringify([
    [60, 62, 64, 66, 68],
    [67, 69, 70, 72, 74],
    [65, 66, 68, 69, 70],
]));

localStorage.setItem("mayBarData", JSON.stringify([
    [75, 78, 80, 82, 85],
    [70, 72, 74, 76, 78],
    [85, 87, 89, 88, 86],
]));

localStorage.setItem("juneBarData", JSON.stringify([
    [55, 57, 60, 63, 65],
    [60, 62, 64, 66, 68],
    [70, 72, 74, 76, 78],
]));

localStorage.setItem("julyBarData", JSON.stringify([
    [80, 82, 84, 86, 88],
    [75, 77, 79, 81, 83],
    [70, 72, 74, 76, 78],
]));

localStorage.setItem("augustBarData", JSON.stringify([
    [65, 67, 69, 71, 73],
    [70, 72, 74, 76, 78],
    [75, 77, 79, 81, 83],
]));

localStorage.setItem("septemberBarData", JSON.stringify([
    [72, 74, 76, 78, 80],
    [65, 67, 69, 71, 73],
    [70, 72, 74, 76, 78],
]));

localStorage.setItem("octoberBarData", JSON.stringify([
    [60, 63, 65, 68, 70],
    [66, 68, 70, 72, 74],
    [64, 66, 68, 70, 72],
]));

localStorage.setItem("novemberBarData", JSON.stringify([
    [78, 76, 74, 72, 70],
    [65, 63, 61, 59, 57],
    [70, 72, 74, 76, 78],
]));

localStorage.setItem("decemberBarData", JSON.stringify([
    [50, 55, 52, 54, 60],
    [69, 66, 68, 66, 70],
    [75, 55, 65, 56, 75],
]));