# Introduction

Functions as a service is a (relatively) recent manifestation of cloud computing.

The iron age of compute began with racked physical servers. Early cloud compute evolved past physical servers into virtual machines. Virtual machines eventually gave way to containers.

Most recently, in what appears to be an ever tightening cycle, containers have given rise to *cloud functions*.

Each cycle has taught new lessons in software architecture, and this most recent iteration changes the shape of the challenges we face.

## Early cloud computing wins

Moving from physical servers to the cloud brought significant advances to our ability to deliver software:

- 100% utilization: only pay for what you use
- Focus on your domain logic, free of infrastructure scaling concerns
- Patches, backups, security, auditing, monitoring are all managed and constantly improving
- Elastic availability of services is becoming a standard feature
- Zero downtime deploys to meet industry expectation of always on availability

## Problems arose

As it turns out, VMs and containers are not problem free:

- The cloud can be nebulous: even the errors are eventually consistent! Failure is expected and software needs to bake in service discovery and retry logic
- Setting up the infrastructure is difficult, time consuming and complex
- Elastic scaling instances are often just load balancing fleets of monolithic applications
- Full deployment cycles across a fleet with zero downtime can take a very long time to complete
- Costly billing, and in some cases rising costs (where the smallest unit of compute is your entire app)

## Cloud functions

With functions as a service, cloud providers have signaled the smallest billable unit of computation is a single function execution.

It's a beautifully simple idea, rejecting the metaphor of a server, and freeing developers to design smaller and simpler services.

We can iterate on our code with a high degree of isolation, without fear of affecting other parts of the system; deploy systems in seconds with zero downtime; and always be available regardless of load.

And, of course, as with any new solution, we've introduced new problems! Next up, we'll look at the [concepts](/intro/concepts) that led to the design of `.arc`, and how it addresses these problems.
