---
title: Chromebook - a toy or something else?
author: Nemanja Mićović
authorimg: nemanja-micovic.jpg
layout: post
category: blog
comments: true
---
### {{ page.title }}

Chromebook is the result of love between a Notebook and  Google Chrome. It's a simple laptop with ChromeOS system with workflow based mostly around the web browser which is of course ~~Internet Explorer~~ Google Chrome. 

So is it a toy? It's down to you really - what you do, how often you do, which software you use...and do you like `synthwave`? I do.

<img alt='synthwave img' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/synth.jpg">

And you know, even if it's a toy in the end, why not? It's cool to play with toys and feel like a kid again, we should not forget that feeling! But read on if you really wish to find out...

`Disclaimer`: This article is best read with <a href="https://www.dotkomsite.com/predstavljamo/povratak-u-buducnost-isidor-bobinec-intervju/" target="_blank">Isidor Bobinec</a>'s album <a href="https://www.youtube.com/watch?v=Td7g1Oj7bgA" target="_blank">Lord of the Synth"</a> album in background.


## Hello Chromebook
So what is a Chromebook? It's a...laptop running a ChromeOS operating system developed by Google and based on GNU/Linux.

> So what's the thing about Chromebooks?

They are usually cheap, fast, small and great for various tasks. And they usually have a really exciting battery life. My current one lasts of around 12 hours with brightness at around 30-50% and with WiFi on. 

### The hardware
The hardware is where you'll get disappointed (mostly) if you look at chromebook as a replacement for your daily PC. Most of the models pack an Intel Celeron or Pentium CPUs, 2-8GB of ram and 16-64GB of storage. It's closer to a strong tablet then a laptop in a way, but that's actually a good thing. You don't need a stronger hardware to run ChromeOS, the system itself is really fast and responsive, and you can buy a new chromebook for prices of around 200-400\$. If you get a used one, you can go for around 50-150\$.  They also pack a touchscreen sometimes, I personally like that a lot as it's much easier for me to tap the screen rather then us the mouse in certain scenarios. And my current one can fold 360 degrees which means I can use it as a tablet.

By no means **all** chromebooks have **weak** hardware and are cheap.. You can get some really powerful ones, but it's not really that useful compared to a regular powerful laptop. Here is [one worth a 1000\$](https://www.youtube.com/watch?v=Ja_GMU7-sjs). With stronger hardware you won't notice much difference. The browser will still work the same (you will probably be able to have 100 tabs opened rather then 20) and you still won't be able to run software like CLion and Unity engine without some serious tinkering with the OS or using the Linux container virtual machine emulation.

<img alt='pixel' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/pixel.jpg">

<img alt='chrombook' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/chromebook.jpg">

## The OS
The OS is based on GNU/Linux OS which Google has worked on to create something they call **ChromeOS**. Their motivation was to create an OS that is mostly focused on cloud  and requires light hardware to run. And since a few years ago, it can also run native Android apps! And since a few months ago, it can also run native Linux apps! But do note, Linux apps are not running on ChromeOS directly but inside a another Linux container you can install in a few clicks. Still, I am able to run Gimp rather well on my machine.

<img alt='please tell me more meme' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/please-tell-me-more.jpg">

> Well okay...
 
The GUI is rather simple. You are greeted with a clean desktop and a task bar at the bottom which contains an app launcher, dock for icons and notification tray.

<img alt='the os' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/os01.jpg">

*App launcher* reminds a bit of Android, and I feel it's a good thing, no need to reinvent the wheel here, but do note, most of these apps you can see are actually web apps you can run using your browser. Some of them launch inside the browser as their own tab (for example YouTube), and other ones launch as a separate window. Google search bar is also available and you can use it to search your apps, device but also use it for googling. Overall, launcher is pleasant to use and you can generally access the thing you want really fast.  Oh and kudos to Google for replacing useless  CapsLock button with a app launcher button, it's nice to actually press CapsLock intentionally.

<img alt='the os' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/os02.png">

*Icon dock* is also rather simple, you can move the icons around, add and remove them and choose where the dock is (left, bottom and right). Generally I've found that I rarely click on the dock but instead prefer to push CapsLock (which launches app launcher) and write a few letters of the program I need and then push enter. Still for older people who are not technology geeks it's simple and intuitive to use.

## Tablet mode
System also supports a tablet mode for devices which come with touchscreen. I was really pleasantly surprised with how well it worked. When I flip the screen over 180 degrees the keyboard gets disabled and system tweaks the windows so that they accommodate touchscreen usage. When you wish to write something you are presented with Android keyboard. In the bottom left you have the **back** button, app launcher button, and in the bottom right you have your app switch button.

<img alt='Tablet mode' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/os03.jpg">

<br />

<img alt='App switcher' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/os04.png">

## Running Android apps
Yes you can, and it works mostly really nice. You can install them from Google Play and simply start them as other apps from your system. Not all apps work perfectly though if they don't support tablet mode. For example here is how Instagram looks on my system. Clicking the maximize button just adds a black background around and leaves the app in portrait mode.

<img alt='Instagram' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/instagram.jpg">

But from my experience Android apps work and start really fast and I would say that this is much much closer to a feature of the Chromebooks rather then a  buggy gimmick. Notifications are displayed also in the bottom right corner and they work nicely with Android apps. I get regularly interrupted by Viber, Slack and Gmail notifs...Of course you can disable notifications if you need so too.

## Running Linux apps
But can it run Linux apps? Yes! Virtually yes.

Yes it can, but it's a bit complicated. One of the main pros of a Chromebook is that it doesn't require maintenance and long updates because you're mostly using your browser. So how do you run the Linux apps? The idea is simple, from a **virtual machine**. But is it slow? Yes and no. By default, the Linux virtual machine is not started, and when you perform an action that needs it, system will start it and keep it running until it thinks it's required. When the VM is on, I generally found that performance was acceptable.

I was able to setup my basic *Vim*, *Tmux* and *Fish* setup in less then 10 minutes. I also installed (you use apt-get) *Git*, *g++*, *Python3* , *pip3* and *wormhole* with no problem at all.
It's not a VM in a way you probably think, you are **not** getting a graphical user interface with folders, desktop and similar, but rather an access to a console which is running inside this Linux container. Files app on ChromeOS can also mount this Linux container so you can access your files from there which was very convenient for me. Also, some programs you install under this VM will appear in the host system like Gimp which you can use like with false belief that it's the part of the host system (ChromeOS).

> But why a VM version of Linux?

Simple, you don't change anything on your host system that way. For lightweight things this is rather acceptable. I'm mostly a console user for daily tasks (aside for serious coding) and mostly use web apps to finish my tasks when terminal isn't flexible enough (drawing images, lightweight design, document creation, slack...).

<img alt='Linux container' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2019-02-24-chromebook-nemanja-micovic/thelinux.png">

## Concerned about privacy, should you use it? 
No.

### Really?
Well yeah. It's a proprietary software, google account and Google Chrome browser so you have your typical privacy concerns. I won't write much about privacy here, it's a topic for a whole new article, but feel free to contact us if you wish to write it! But before you write Chromebooks off, if you have a Google account and use Gmail, you've given up your privacy anyway, so you may as well get a Chromebook if you want :)

## Ok, you convinced me, where can I buy it?
You can't officially in Serbia. I mean you can, but in Serbia they are not officially sold in IT shops so it's best to look one though websites like [kupujemprodajem](http://kupujemprodajem.com) (I got mine here) and [kupindo](kupindo.com).

## Conclusion
So is it a toy in the end? I think it depends on how to look at it. If most of your work is spent on a Desktop computer inside an IDE then Chromebook really is a toy for you, but then anyway, you probably don't need a laptop anyway.

Here are the situations in which I use it:
- Online courses (Coursera, Udacity...)
- Teamwork and organization (Slack, Email, Viber., Wunderlist...)
- Online meetings (skype, appear.in and similar...)
- Reading science papers (I switch to tablet mode)
- Taking notes on conferences and meetups
- Giving presentations and using the screen for writing during the event
- Some Python scripting from Linux container (and Google Collab is great also)
- As a small utility device when I travel
- As a secondary screen when I work on my main laptop

### Pros
- Stable OS
- Fast to boot (around 10 seconds)
- Long battery life (around 12h of basic usage)
- Simple system to use (even for your parents!)
- Android apps available
- Linux programs available
- Great integrations with Google ecosystem
- 100 GB of free Google Drive storage for 2 years

### Cons
- ChromeOS can be limiting
- Can't replace a production computer
- Not possible to use programs like Microsoft Office, Photoshop...
- Privacy?

## P.S.
Oh the stuff about synthwave at the beginning probably still has you confused...it's nothing, I'm just trying to promote it (without taking any money, if you wonder!).
