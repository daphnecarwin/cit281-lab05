const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];


// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax

//student route
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

//student id route
fastify.get("/cit/student/:id", (request, reply) => {
    //1) Get the ID
    let studentIDFromClient = request.params.id;

    //2) Get the student associated with the ID
    let studentRequestedFromClientID= null;

    for(studentInArray of students) {
        if(studentInArray.id == studentIDFromClient){
            studentRequestedFromClientID = studentInArray;
            break;
        }
    }

    //3) Send student data 
    if(studentRequestedFromClientID != null){
        reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(studentRequestedFromClientID);
    }
    else {
        reply 
        .code(404)
        .header("Content-Type", "text/html; charset=utf")
        .send("<h1>No student with the given ID was found.<h1>");
    }
    
  });

//Unmatched / Wildcard route
fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>At Unmatched Route</h1>");
  });

fastify.post("/cit/students/add", (request, reply) => {
  let userData= JSON.parse(request.body)
  console.log(userData);

    //fname= dataFromClient.firstname
    //id = maxID + 1
  reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>At 'ADD STUDENT' route</h1>");
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
