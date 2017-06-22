# Concepts

In the iron age of computing we lost our knuckles racking servers. Today we rap our knuckles on the metaphor of servers in the form of cloud spot instances. Early cloud age compute evolved past physical servers with virtual machines. More recently, in what appears to be an ever tightening cycle, containers have given rise to *functions as a service*.

Functions as a service is a recent conclusion of cloud computing. With functions as a service cloud providers have signaled the smallest billable unit of computation is a single function execution. It is a beautifully simple idea to reject the metaphor of a server which frees developers to design smaller and simpler services. We can iterate on our code with a high degree of isolation, without fear of effecting other parts of the system, deploy systems with zero downtime and always be available regarless of load.

The cloud brings significant advances to our ability to deliver software:

- 100% utilization: only pay for what you use
- Focus on your domain logic free of infrastructure scaling concerns
- Patches, backups, security, auditing, monitoring are all managed and improving
- Elastic availability of services is becoming a standard feature
- Zero downtime deploys 

Even with these benefits the cloud comes with unique problems.

- AWS is massive and overwhelming with many similar, but not the same, products
- The web console is confusing with divergent interfaces between services
- Deep proprietary knowledge is required to configure raising the potential for Lock in
- Configuration and infrastructure can drift, leaving systems in difficult to repeat/reproduce and thus scale

We've tamed many of these problems with _infrastructure as code_ creating repeatable and reproducable systems. The tradeoff is you are committing aws configuration knowledge into your revision control systems. `.arc` views infrastructure as a build artifact. *And we do not recommend checking build artifacts into our code.*

## .arc file

- `.arc` is just text
- Focus on defining your app architecture with a subset of service primatives as high level defintions
- Use the console tactically with only the service primatives defined in `.arc`

In theory, `.arc` is entirely portable between cloud vendors. (However no ports to clouds other than AWS have been made as of this writing.)

# .arc file format

This is a complete `.arc` file example. The format follows a few simple rules:

- Comments start with `#`
- Sections start with `@`
- `@app` defines the application name
- `@html` section defines html routes
- `@json`  defines json routes
- `@events` defines application events you can publish and subscribe to
- `@scheduled` defines functions that run on a timed schedule
- `@tables` defines database tables and trigger functions for them
- `@indexes` defines additional database table indexes

```
# .arc
@app
hello

@html
get /
post /likes

@json
get /likes

@events
hit-counter

@tables
likes
  likeID *String
```

Using `arc-create` the `.arc` file above would map to a file system layout of code as follows:

```
/
|-src
| |-html
| | |-get-index
| | '-post-likes
| |-json
| | '-get-likes
| '-events
|   '-hit-counter
|-.arc
'-package.json

```

Where `get-index`, `post-likes`, `get-likes` and `hit-counter` are lambda functions. All the permissions are automatically wired. A database table `likes` is created. Also upon creation all code is already live and automatically ready for deployment to `staging` or `production` in seconds. 

### Delivery and Deployment

Delivery to `staging` is extremely fast and entirely frictionless. Promotion to `production` is equally fast but requires an additional step.

### Logging and Monitoring

- Good old fashioned `console.log` will show up in CloudWatch
- CloudWatch events offers a tonne of metrics
- X Ray offers deeper service call introspection capabilties
- There are many third party tools to further extend your app with structured logs
