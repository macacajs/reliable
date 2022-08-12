(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{281:function(e,a,t){"use strict";t.r(a);var r=t(13),s=Object(r.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"reliable-web-deploy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reliable-web-deploy"}},[e._v("#")]),e._v(" Reliable Web Deploy")]),e._v(" "),a("hr"),e._v(" "),a("p",[e._v("Note: You need to run both the database container ("),a("code",[e._v("reliable-mysql")]),e._v(") and the app ("),a("code",[e._v("reliable-web")]),e._v(") container for reliable to work.")]),e._v(" "),a("h2",{attrs:{id:"using-docker-compose-recommended"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-docker-compose-recommended"}},[e._v("#")]),e._v(" Using "),a("a",{attrs:{href:"https://docs.docker.com/compose/",target:"_blank",rel:"noopener noreferrer"}},[e._v("docker-compose"),a("OutboundLink")],1),e._v(" (recommended)")]),e._v(" "),a("h3",{attrs:{id:"production"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#production"}},[e._v("#")]),e._v(" production")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# start services\n$ docker-compose -p reliable -f docker-compose.yml up -d\n\n# NOTE: if you meet the problem, maybe the issue caused by the existed service, just run the stop command below.\n\n# stop services\n$ docker-compose -p reliable -f docker-compose.yml down\n")])])]),a("p",[e._v("Execute "),a("code",[e._v("docker ps")]),e._v(", we can see:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('$  docker ps\nCONTAINER ID        IMAGE                      COMMAND                  CREATED             STATUS                            PORTS                               NAMES\n7c641bdb57c6        macacajs/reliable-web:v2   "./entrypoint.sh npm…"   6 seconds ago       Up 5 seconds (health: starting)   0.0.0.0:9900->9900/tcp              reliable_web_1\nf589b1c9046f        macacajs/reliable-mysql    "docker-entrypoint.s…"   6 minutes ago       Up 6 seconds                      0.0.0.0:3306->3306/tcp, 33060/tcp   reliable_mysql_1\n')])])]),a("p",[e._v("During the first deployment, seed the database before accessing the web portal. Otherwise 500 will be thrown:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("NODE_ENV")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("production "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" run db:seed:all\n")])])]),a("p",[e._v("To go into the MySQL:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("docker")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("exec")]),e._v(" -it reliable_mysql_1 mysql -uroot -preliable\nmysql"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" use reliable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\nmysql"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" show tables"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\nmysql"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("select")]),e._v(" * from reliable.jobNames"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])])]),a("h3",{attrs:{id:"development"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#development"}},[e._v("#")]),e._v(" development")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# start services\n$ docker-compose up\n\n# stop services\n$ docker-compose down\n")])])]),a("p",[e._v("Reliable server is running on "),a("code",[e._v("http://127.0.0.1:9900")]),e._v(" by default.")]),e._v(" "),a("p",[e._v("Edit "),a("a",{attrs:{href:"https://github.com/macacajs/reliable/blob/master/docker-compose.yml",target:"_blank",rel:"noopener noreferrer"}},[e._v("docker-compose.yml"),a("OutboundLink")],1),e._v(" to fit your need.")]),e._v(" "),a("h2",{attrs:{id:"using-docker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-docker"}},[e._v("#")]),e._v(" Using "),a("a",{attrs:{href:"https://docs.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("docker"),a("OutboundLink")],1)]),e._v(" "),a("h3",{attrs:{id:"database-container-reliable-mysql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#database-container-reliable-mysql"}},[e._v("#")]),e._v(" Database container - reliable-mysql")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/macacajs/reliable/blob/master/docker/reliable-mysql/Dockerfile",target:"_blank",rel:"noopener noreferrer"}},[e._v("Dockerfile"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/macacajs/reliable/blob/master/docker/reliable-mysql/README.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("doc"),a("OutboundLink")],1)])]),e._v(" "),a("h3",{attrs:{id:"reliable-main-app-container-backend-and-frontend-reliable-web"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reliable-main-app-container-backend-and-frontend-reliable-web"}},[e._v("#")]),e._v(" Reliable main app container (backend and frontend) - reliable-web")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/macacajs/reliable/blob/master/Dockerfile",target:"_blank",rel:"noopener noreferrer"}},[e._v("Dockerfile"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/macacajs/reliable/blob/master/docker/reliable-web/README.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("doc"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=s.exports}}]);