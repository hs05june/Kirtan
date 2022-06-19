    let aarNanak = document.getElementById('aarNanak');
    let currentImage = document.getElementById('currentImage');
    let currentName =  document.getElementById('currentName');
    let currentSinger =  document.getElementById('currentSinger');
    let playBtn = document.getElementById('playBtn');
    let gif = document.getElementById("gif");
    let timeStamp = document.getElementById('timeStamp');
    let progress = document.getElementById('progress');
    let list = document.getElementById("list");
    let listItems = document.getElementsByClassName("listItem");
    let forBtn = document.getElementById("forBtn");
    let backBtn = document.getElementById("backBtn");
    let index = 0;
    let prevIndex=-1;
    let audio = new Audio("/music/1.mp3");

    let songs = [
        {name:"AAR NANAK PAAR NANAK",singer:"DILJIT DOSANJH",index:1,song:"/music/1.mp3",image:"/photo/1.jpg"},
        {name:"AWAL ALLAH NOOR",singer:"BHAI GURMEET SINGH",index:2,song:"/music/2.mp3",image:"/photo/2.jpg"},
        {name:"BABA MAN MATVARO",singer:"GAGANDEEP SINGH",index:3,song:"/music/3.mp3",image:"/photo/3.jpg"},
        {name:"BHINNI RAINARIE",singer:"BHAI KARENJIT SINGH",index:4,song:"/music/4.mp3",image:"/photo/4.jpg"},
        {name:"FARIDA ME JAANEYA DUKH",singer:"JAGJIT SINGH",index:5,song:"/music/5.mp3",image:"/photo/5.jpg"},
        {name:"HAR KO NAAM SADA",singer:"BHAI NIRMAL SINGH",index:6,song:"/music/6.mp3",image:"/photo/6.jpg"},
        {name:"HAMREE KARO HAATH DE",singer:"DALER MEHNDI",index:7,song:"/music/7.mp3",image:"/photo/7.jpg"},
        {name:"KAGOH HANS KARE",singer:"BHAI HARJOT SINGH",index:8,song:"/music/8.mp3",image:"/photo/8.jpg"},
        {name:"LOGA BHARAM NA",singer:"GANGANDEEP SINGH",index:9,song:"/music/9.mp3",image:"/photo/9.jpg"},
        {name:"MITARA PYAARE NOO",singer:"MOHAMMAD RAFI",index:10,song:"/music/10.mp3",image:"/photo/10.jpg"},
        {name:"MOHAN GHAR AAVO",singer:"BHAI NIRMAL SINGH",index:11,song:"/music/11.mp3",image:"/photo/11.jpg"},
        {name:"NAHI CHHODDO RE",singer:"PROF KARTAR SINGH",index:12,song:"/music/12.mp3",image:"/photo/12.jpg"},
        {name:"RAJAN KE RAJA",singer:"BHAI SARABJEET SINGH",index:13,song:"/music/13.mp3",image:"/photo/13.jpg"},
    ];

    document.getElementById("0").classList.add("playItem");
    // songs.forEach((ele)=>{
    //     let newItem = document.createElement('div');
    //     newItem.classList.add('listItem');

    //     let newIndex = document.createElement('span');
    //     newIndex.innerHTML=ele['index'];
    //     newIndex.classList.add("songIndex");
    //     newItem.append(newIndex);

    //     let newImage = document.createElement('img');
    //     newImage.src=ele['image'];
    //     newImage.classList.add('songImage');
    //     newItem.append(newImage);

    //     let newName = document.createElement('span');
    //     newName.innerHTML=ele['name'];
    //     newName.classList.add('songName');
    //     newItem.append(newName);

    //     let newSinger = document.createElement('span');
    //     newSinger.innerHTML=ele['singer']
    //     newSinger.classList.add('songSinger');
    //     newItem.append(newSinger);

    //     list.append(newItem);
    // });

    Array.from(listItems).forEach((ele,i)=>{
        ele.getElementsByClassName('songIndex')[0].innerHTML = `${songs[i].index})`;
        ele.getElementsByClassName('songImage')[0].src = songs[i].image;
        ele.getElementsByClassName('songName')[0].innerHTML = songs[i].name;
        ele.getElementsByClassName('songSinger')[0].innerHTML = songs[i].singer;
    });

    Array.from(listItems).forEach((element)=>{
        element.addEventListener("click",(e)=>{
                let a = parseInt(e.target.id);
                prevIndex=index;
                index=a;
                if(index!=prevIndex){playSong(index,prevIndex);}
        });
    });
    
    
    playBtn.addEventListener("click", function(){
        if(audio.paused || audio.currentTime==0){
            audio.play();
            gif.style.opacity=1;
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        }
        else{
            audio.pause();
            gif.style.opacity=0;
            playBtn.classList.remove('fa-pause');
            playBtn.classList.add('fa-play');
        }
    });
    
    audio.addEventListener('timeupdate',function(){
        console.log('timeupdate');
        if(audio.currentTime==audio.duration){prevIndex=index;++index;
                if(prevIndex==12){index=0;}
            playSong(index,prevIndex);}
        let a1 = parseInt(audio.currentTime/60);
        let a2 = parseInt(audio.currentTime)%60;
        let b1 = parseInt(audio.duration/60);
        let b2 = parseInt(audio.duration)%60;
        timeStamp.innerHTML=`${a1}:${a2} / ${b1}:${b2}`;
        progress.value = audio.currentTime/audio.duration*1000;
    });
    
    
    progress.addEventListener("change",function(){
        audio.currentTime = (progress.value)*(audio.duration)/1000;
    });
    
    forBtn.addEventListener("click",function(){
        if(index==12){alert("NO NEXT SONG!!");}
        else{prevIndex=index;++index;
            playSong(index,prevIndex);
        }
    });
    backBtn.addEventListener("click",function(){
        if(index==0){alert("NO PREVIOUS SONG!!");}
        else{prevIndex=index;
            --index;
            playSong(index,prevIndex); }
    });

    function playSong(index,prevIndex){
        let x = document.getElementById(`${index}`);
        x.classList.add("playItem");
        if(index!=prevIndex){
            let z = document.getElementById(`${prevIndex}`);
            z.classList.remove("playItem");}
        playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
            gif.style.opacity=1;
            audio.src=songs[index].song;
            audio.play();
            currentName.innerHTML=songs[index].name;
            currentImage.innerHTML=`<img src="${songs[index].image}">`;
            currentSinger.innerHTML=songs[index].singer;

    }