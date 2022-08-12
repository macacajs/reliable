(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{275:function(t,e,a){"use strict";a.r(e);var s=a(13),n=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"integrate-with-jenkins"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#integrate-with-jenkins"}},[t._v("#")]),t._v(" Integrate With Jenkins")]),t._v(" "),e("hr"),t._v(" "),e("h2",{attrs:{id:"reliable-home-path"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reliable-home-path"}},[t._v("#")]),t._v(" Reliable home path")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$HOME")]),t._v("/reliable_home\n")])])]),e("p",[t._v("reliable_home requires the following sub-directories to be created.")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v(".\n├── static                               Static HTTP server root folder, containing build artifacts, reports, and archived files.\n├── mysql_data                           Mysql Database. Can be backed up easily.\n├── jenkins_home                         Jenkins root folder, containing configuration files and plugins.\n├── jenkins_tmp                          Jenkins temporary folder.\n└── jenkins.war                          Jenkins war package. Can execute programs.\n")])])]),e("h2",{attrs:{id:"reliable-jenkins-deployment"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reliable-jenkins-deployment"}},[t._v("#")]),t._v(" Reliable Jenkins Deployment")]),t._v(" "),e("ul",[e("li",[t._v("In "),e("code",[t._v("$HOME/reliable_home")]),t._v(" directory, create jenkins_home, jenkins_tmp")]),t._v(" "),e("li",[t._v("Download official "),e("a",{attrs:{href:"http://mirrors.jenkins.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("War package"),e("OutboundLink")],1),t._v(" to $HOME/reliable_home directory")]),t._v(" "),e("li",[t._v("jenkins service launches at port 9910")])]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ java -Dfile.encoding"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("UTF-8 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -XX:PermSize"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("256m "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -XX:MaxPermSize"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("512m "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -Xms256m "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -Xmx512m "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -DJENKINS_HOME"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$HOME")]),t._v("/reliable_home/jenkins_home "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -Djava.io.tmpdir"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$HOME")]),t._v("/reliable_home/jenkins_tmp "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  -jar "),e("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$HOME")]),t._v("/reliable_home/jenkins.war "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --httpPort"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("9910")]),t._v("\n")])])]),e("p",[t._v("Change "),e("code",[t._v("$HOME/reliable_home/jenkins_home/config.xml")]),t._v(" useSecurity to false, and restart the Jenkins.")]),t._v(" "),e("div",{staticClass:"language-xml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-xml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("useSecurity")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("false"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("useSecurity")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("ol",{attrs:{start:"0"}},[e("li",[t._v("input the "),e("code",[t._v("initialAdminPassword")]),t._v(" and next.")]),t._v(" "),e("li",[t._v("select "),e("code",[t._v("Install suggested plugins")]),t._v(" and wait for Jenkins plugins installation ready.")])]),t._v(" "),e("hr"),t._v(" "),e("h2",{attrs:{id:"build-tasks-sample"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#build-tasks-sample"}},[t._v("#")]),t._v(" Build Tasks Sample")]),t._v(" "),e("ul",[e("li",[e("RouterLink",{attrs:{to:"/guide/jenkins-android.html"}},[t._v("jenkins-android.md")])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/guide/jenkins-ios.html"}},[t._v("jenkins-ios.md")])],1),t._v(" "),e("li",[e("RouterLink",{attrs:{to:"/guide/jenkins-web.html"}},[t._v("jenkins-web.md")])],1)])])}),[],!1,null,null,null);e.default=n.exports}}]);