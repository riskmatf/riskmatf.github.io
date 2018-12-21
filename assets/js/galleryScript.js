const mainImageSize = {width:'100%', height:'20vw'};
const otherImageSize= {width:'100%', height:'5vw'};

init();

function init()
{
	document.querySelector('.album').style.color= '#00aeef';
	let underlines = document.querySelectorAll('.album-underline');
	for(let underiline of underlines)
	{
		underiline.hoverAnimation = anime(
			{
				targets: underiline,
    			width: '100%',
				easing:'linear',
				duration:250,
				autoplay:false
			});
		underiline.hoverAnimation.reverse();
	}


	underlines[0].classList.add('underline-active');
	underlines[0].hoverAnimation.reverse();
	underlines[0].hoverAnimation.play();
	changeImages(0);
}

function changeImages(to, onMobile)
{
     let images =  window.albums[to].images;
     if(!onMobile)
	 {
	 	let album_title_el = document.querySelector('#album_title');
	 	if(album_title_el)
	 	{
	 		album_title_el.textContent = window.albums[to].name;
	 	}

	 	let album_date_el = document.querySelector('#album_date');

     	if(album_date_el)
     	{
     		album_date_el.textContent = window.albums[to].date;
     	}

     	let first  = images[0];
     	let rest = images.slice(1);

     	anime(
     	{
			targets:['.img', '#main_image > img'],
			width: 0,
			height:0,
			opacity:0,
			easing:'linear',
			duration:500,
			complete: function()
			{
         	    let els = document.querySelectorAll('#other_images > .col-3');
         	    for(let el of els)
         	    {
         	    	if(el)
					{
						el.remove();
					}
	            }

         	    els = document.querySelector('#main_image > div.img');
         	    if(els)
				{
					els.remove();
				}
         	    let main_img = createMainImage(first);

         	    document.querySelector('#main_image').append(main_img);

				let restImages = [];
				let otherImagesRoot = document.querySelector('#other_images');

				for(let imgIndex in rest)
				{
					let img = createOtherImages(rest[imgIndex], parseInt(imgIndex, 10)+1);
					restImages.push(img);
					otherImagesRoot.append(img);
				}

				anime({
					targets:main_img,
					easing:'linear',
					duration:500,
					opacity:1,
					width:mainImageSize.width,
					height:mainImageSize.height
				});

				anime({
					targets:restImages,
					easing:'linear',
					duration:500,
					opacity:1,
					width:otherImageSize.width,
					height:otherImageSize.height
				});
			},
		});

	 }

     /*Change images in carousel*/

	carouselInner = document.querySelector('.carousel-inner');
	if(!carouselInner)
	{
		return;
	}

	while(carouselInner.firstChild)
	{
	    carouselInner.removeChild(carouselInner.firstChild);
	}

	images.forEach(function(value)
	{
		carouselInner.append(createCarouselImage(value));
	})




}

function createCarouselImage(src)
{
	let divCarouselItem = document.createElement('div');
	divCarouselItem.classList.add('carousel-item');

	let divRow = document.createElement('div');
	divRow.classList.add('row', 'justify-content-center');

	let divCol= document.createElement('div');
	divCol.classList.add('col-auto');

	let imageContainer = document.createElement('div');
	imageContainer.classList.add('carousel-image-container');

	let img = document.createElement('img');
	img.setAttribute('src', src.sm);
	img.setAttribute('srcset', `${src.xs} 340w ,${src.sm} 480w, ${src.md} 640w, ${src.lg} 820w`);
	img.setAttribute('sizes', '(max-width: 576px) 340px, (max-width:768px) 480px, (max-width:992px) 640px,' +
		'  820px');


	imageContainer.append(img);
	divCol.append(imageContainer);
	divRow.append(divCol);
	divCarouselItem.append(divRow);

	return divCarouselItem;
}


function createMainImage(src)
{
	let img = createMyImage(src, 0);
	img.style.opacity  = '0';
	img.style.width = '0px';
	img.style.height = '0px';
	return img;
}

function createOtherImages(src, index)
{

	let img = document.createElement('div');
	img.setAttribute('class', 'col-3 mt-2');
	img.setAttribute('width', '0');

	let innerImage = createMyImage(src, index);

	img.append(innerImage);
	img.style.opacity = '0';
	img.style.width = '0px';
	img.style.height = '0px';
	return img;
}

function createMyImage(src, index)
{
	let innerImage = document.createElement('div');
	innerImage.setAttribute('class', 'img img-thumbnail');
	innerImage.style.backgroundImage = `url(${src.lg})`;

	innerImage.onclick = function ()
	{
		onImageViewToggled(index);
	};
	return innerImage;
}

function onAlbumClicked(to)
{
	let prevSelected = document.querySelector('.album-underline.underline-active');
	let selected = document.querySelectorAll('.album-underline')[to];
	if(prevSelected === selected)
	{
		return;
	}

	changeImages(to, false);
	prevSelected.classList.remove('underline-active');

	selected.classList.add('underline-active');

	prevSelected.previousElementSibling.style.color = 'black';
	selected.previousElementSibling.style.color = '#00aeef';


	prevSelected.hoverAnimation.reverse();
	prevSelected.hoverAnimation.play();


	/*selected.hoverAnimation.reverse();
	selected.hoverAnimation.play();*/


}

function onAlbumClickedMobile(to)
{
	let prevSelected  = document.querySelector('.list-group-item.album-active');
	if(prevSelected)
	{
		prevSelected.classList.remove('album-active');
		prevSelected.classList.remove('active');
	}

	let currentSelected = document.querySelectorAll('.list-group-item');

	if(currentSelected && currentSelected[to])
	{
		currentSelected[to].classList.add('album-active');
		currentSelected[to].classList.add('active');
	}

	changeImages(to, true);
	setTimeout(onImageViewToggled.bind(this, 0), 150);
}

function onMouseEnter(index)
{
	let selected = document.querySelectorAll('.album-underline')[index];
	if(selected.classList.contains('underline-active'))
	{
		return;
	}

	selected.hoverAnimation.pause();
	selected.hoverAnimation.reverse();
	selected.hoverAnimation.play();
}


function onImageViewToggled(imageSelected)
{
	carousel = document.querySelector('.cover-all');

	if(!carousel)
	{
		return;
	}

	if(imageSelected !== -1)
	{
		let images = document.querySelectorAll('.carousel-item');
		if(!images)
		{
			return;
		}

		images[imageSelected].classList.add('active');
	}
	else
	{

		let images = document.querySelectorAll('.carousel-item');
		if(!images)
		{
			return;
		}

		for(let img of images)
		{
			img.classList.remove('active');
		}
	}

	if(carousel.style.display === 'none' || carousel.style.display === '')
	{
		carousel.style.display = 'block';
		document.body.style.overflow = 'hidden';
		 anime(
			{
				targets:carousel,
				easing:'linear',
				duration:400,
				opacity:1
			}
		);
	}
	else
	{
		document.body.style.overflow = 'auto';
		anime(
			{
				targets:carousel,
				easing:'linear',
				duration:400,
				opacity:0,
				complete: function ()
				{
					carousel.style.display = 'none';
				}
			}
		)
	}
}

function onCoverAllClicked(event)
{
	let el = document.querySelector('.carousel');
	if(!event|| !el)
	{
		return ;
	}

	let rect = el.getBoundingClientRect();

	if(event.clientX < rect.left || rect.left + rect.width < event.clientX)
	{
		onImageViewToggled(-1);
		return ;
	}


	if(event.clientY < rect.top || rect.top + rect.height < event.clientY)
	{
		onImageViewToggled(-1);
		return ;
	}

}

