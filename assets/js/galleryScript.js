document.querySelector('.album').style.color= 'lightblue';
let first_underline = document.querySelector('.album-underline');
var animation =  anime(
	{
    targets: first_underline,
    width: '100%'
	});

first_underline.classList.add('underline-active');

function changeImages(to)
{
     let images =  window.albums[to].images;

     let first  = images[0];
     let rest = images.slice(1);

     var t = anime(
     	{
			targets:['.img', '#main_image > img'],
			width: 0,
			height:0,
			opacity:0,
			complete: function()
			{
         	    let els = document.querySelectorAll('#other_images > .col-3');
         	    for(let el of els)
	              {
	              	el.remove();
	              }

		   els = document.querySelector('#main_image > img');
             els.remove();

             let main_img = createImageTag(first);
             document.querySelector('#main_image').append(main_img)

		   let restImages = [];
             let otherImagesRoot = document.querySelector('#other_images');

		   for(let imgSrc of rest)
		   {
		   		let img = createMyImage(imgSrc);
		  		restImages.push(img);
		  		otherImagesRoot.append(img);
		   }

             anime({
                 targets:[main_img, ...restImages],
                 width:'100%',
                 opacity:100,
             });

         },
     });
}

function createImageTag(src)
{
	let img = document.createElement('img');
	img.setAttribute('src', src);
	img.setAttribute('width', 0);
	img.style.opacity=0;

	return img;
}

function createMyImage(src)
{
	let img = document.createElement('div');
	img.setAttribute('class', 'col-3 mt-2');
	img.setAttribute('width', '0');

	let innerImage = document.createElement('div');
	innerImage.setAttribute('class', 'img img-thumbnail');
	innerImage.style.backgroundImage = `url(${src})`
	img.append(innerImage);
	return img;

}

function onAlbumClicked(to)
{
	let prevSelected = document.querySelector('.album-underline.underline-active');
	let selected = document.querySelectorAll('.album-underline')[to];
	if(prevSelected === selected)
	{
		return;
	}

	changeImages(to);
	prevSelected.classList.remove('underline-active');

	selected.classList.add('underline-active');

	prevSelected.previousElementSibling.style.color = 'black';
	selected.previousElementSibling.style.color = 'lightblue';



	anime(
	{
		targets: prevSelected,
		width:0,
	});

	anime(
	{
		targets: selected,
		width:'100%',
	});



}

