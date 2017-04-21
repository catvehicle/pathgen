		var canvas, ctx, flag = false,
			startX = 0,
			startY = 0,
			prevX = 0,
			currX = 0,
			prevY = 0,
			currY = 0,
			dot_flag = false;
		
		var path = '';
		
		var xs = [];
		var ys = [];
		var phis = [];
		/*
        var xs = 'xs = [';
        var ys = 'ys = [';
        var phis = 'phis = [';
		*/
		var stroke_Style = "blue",
			line_width = 2;
    
		function init() 
		{
			canvas = document.getElementById('can');
			ctx = canvas.getContext("2d");
			w = canvas.width;
			h = canvas.height;
		
			//If the user moves the mouse one pixel, the mousemove event fires.
			canvas.addEventListener("mousemove", function (e) 
			{
				findxy('move', e)
			}, false);
			
			canvas.addEventListener("touchmove", function (e) 
			{
				findxy('touchmove', e)
			}, false);
			
			//user depresses the mouse button on this element
			canvas.addEventListener("mousedown", function (e) 
			{
                startX = 0; startY = 0; prevX = 0; prevY = 0;
                currX = 0; currY = 0; 
				path = ''; 
				
				//Path information will be stored in xs, ys and phis
				
				xs = [];
				ys = [];
				phis = [];
				/*
				xs = 'xs = [';
                ys = 'ys = ['; 
				phis = 'phis = [';
				*/
				ctx.clearRect(0, 0, w, h);
				document.getElementById("canvasimg").style.display = "none";
				findxy('down', e)
			}, false);
			
			canvas.addEventListener("touchstart", function (e) 
			{
                startX = 0; startY = 0; prevX = 0; prevY = 0;
                currX = 0; currY = 0; 
				path = ''; 
				
				//Path information will be stored in xs, ys and phis
				xs = [];
				ys = [];
				phis = [];
				/*
				xs = 'xs = [';
                ys = 'ys = ['; 
				phis = 'phis = [';
				*/
				ctx.clearRect(0, 0, w, h);
				document.getElementById("canvasimg").style.display = "none";
				findxy('touchstart', e)
			}, false);
			
			// user releases the mouse button on this element
			canvas.addEventListener("mouseup", function (e) 
			{
				findxy('up', e)
			}, false);
			
			//mouseout event is fired when mouse leaves canvas
			canvas.addEventListener("mouseout", function (e) 
			{
				findxy('out', e)
			}, false);
			canvas.addEventListener("touchend", function (e) 
			{
				findxy('touchend', e)
			}, false);
			canvas.addEventListener("touchcancel", function (e) 
			{
				findxy('touchcancel', e)
			}, false);
		}
    
		function draw() 
		{
			//The beginPath() method begins a path, or resets the current path.
			ctx.beginPath();
			//defines the starting point of the line
			ctx.moveTo(prevX, prevY);
			//defines the ending point of the line
			ctx.lineTo(currX, currY);
			//The strokeStyle property sets or returns the color, gradient, or pattern used for strokes.
			ctx.strokeStyle = stroke_Style;
			//The lineWidth property sets or returns the current line width, in pixels.
			ctx.lineWidth = line_width;
			//calling stroke actually draws the line
			ctx.stroke();
			ctx.closePath();
		}
        
		function findxy(res, e) 
		{
			if (res == 'down' || res == 'touchstart') 
			{
				
				prevX = currX;
				prevY = currY;
				//e.clientX gives the horizontal coordinates
				//e.clientY gives the vertical coordinates
				//offsetLeft  returns the number of pixels that the upper left corner of the current element is offset to the left within the parent Node; same for offsetTop
				currX = e.clientX - canvas.offsetLeft;
				currY = e.clientY - canvas.offsetTop;
				startX = currX;
				startY = currY;
				console.log('#',startX);
				var adjustedX = currX - startX;
				var adjustedY = (currY - startY);
                //scaling factor is 1/10
                adjustedX = adjustedX/10;
                adjustedY = adjustedY/10;
				
				xs.push(adjustedX);
				ys.push(adjustedY);
				
				/*
				xs = xs.concat(adjustedX).concat('; ');
				ys = ys.concat(adjustedY).concat('; ');
				var phi = Math.atan((currY - prevY)/(currX - prevX))*-1;
				phis = phis.concat(phi).concat('; ');
				*/
				flag = true;
				dot_flag = true;
				if (dot_flag) 
				{
					ctx.beginPath();
					ctx.fillStyle = stroke_Style;
					ctx.fillRect(currX, currY, 2, 2);
					ctx.closePath();
					dot_flag = false;
				}
			}
			if (res == 'move') 
			{
				if (flag) 
				{
					prevX = currX;
					prevY = currY;
					//e.clientX gives the horizontal coordinates
					//e.clientY gives the vertical coordinates
					//offsetLeft  returns the number of pixels that the upper left corner of the current element is offset to the left within the parent Node; same for offsetTop
					currX = e.clientX - canvas.offsetLeft;
					currY = e.clientY - canvas.offsetTop;
					console.log('*',startX);
					var adjustedX = currX - startX;
					var adjustedY = (currY - startY);
                    //scaling factor is 1/10
                    adjustedX = adjustedX/10;
                    adjustedY = adjustedY/10;
					
					
					xs.push(adjustedX);
					ys.push(adjustedY);
					
					/*
					xs = xs.concat(adjustedX).concat('; ');
					ys = ys.concat(adjustedY).concat('; ');
					var phi = Math.atan((currY - prevY)/(currX - prevX))*-1;
					phis = phis.concat(phi).concat('; ');
					*/
					
					draw();
				}
			}
			if (res == 'up' || res == 'out' || res == 'touchend' || res == 'touchcancel') 
			{
				flag = false;
			}
			
		}
		
		function color(obj) 
		{
			switch (obj.id) {
				case "black":
					stroke_Style = "black";
					break;
				case "white":
					stroke_Style = "white";
					break;
			}
			if (stroke_Style == "white") 
				line_width = 14;
			else 
				line_width = 2;
		}
		function erase() 
		{
			var m = confirm("Want to clear");
			if (m) {
				ctx.clearRect(0, 0, w, h);
				document.getElementById("canvasimg").style.display = "none";
			}
		}
    
		function save() 
		{
			document.getElementById("canvasimg").style.border = "none";
			var dataURL = canvas.toDataURL();
			document.getElementById("canvasimg").src = dataURL;
			document.getElementById("canvasimg").style.display = "inline";
			document.getElementById("canvasimg").style.background = "#6CF";
			
			for(var i = 0; i < xs.length - 2; i = i +2)
			{
				/*
				If the slope of last line segment of last beizer curve has sign 
				
				from the slop of first line segment of current beizer curve,
				
				then there won't be G1 continuity. In other words, when direction of the last segment of last beizer curve
				
				and the direction of the first segment of current beizer curve are opposite, then we can't expect G1 continuity.
				
				To fix this problem, the end point ( call it i) of last beizer curve and current beizer curve (which is same) 
				
				in that case will be replaced by mid points of points i - 1 and i + 1.
				
				*/
				if( i >=2)
				{
					var lastSlope = (ys[i] - ys[i - 1])/(xs[i] - xs[i - 1]);
					var currentSlope = (ys[i] - ys[i - 1])/(xs[i] - xs[i - 1]);
					//if(lastSlope*currentSlope <= 0)
					//{
						ys[i] = (ys[i+1] + ys[i-1])/2;
						xs[i] = (xs[i+1] + xs[i-1])/2;
					//}
				}
			}
			
			var Xbeizer = [];
			var Ybeizer = [];
			phis = [];
			phis.push(0);
			var prevXc = 0;
			var prevYc = 0;
			
			var xContent = '';
			var yContent = '';
			var phiContent = '';
		    var count = 0;	
			for(var i = 0; i < xs.length - 2; i = i +2)
			{
				/*
				Compute intermediate points of beizer curve segment for n = 2. 
				
				It means we will have beizer curve of degree 2.
				
				*/
				for(var t = 0; t <=1; t = t + 0.25)
				{
					var Xc = (xs[i]*(1-t)*(1-t))  +  (xs[i+1]*2*(1-t)*t)  +  (xs[i+2]*t*t);
					var Yc = (ys[i]*(1-t)*(1-t))  +  (ys[i+1]*2*(1-t)*t)  +  (ys[i+2]*t*t);
					var phi = 0;
					Xbeizer.push(Xc);
					Ybeizer.push(Yc);
					if(Xbeizer.length > 1)
					{
						phi = Math.atan2((Yc - prevYc),(Xc - prevXc));
					}
					else
					{
						phi = 0;
						console.log('phi', phi);
					}
				    
                    
                    console.log('Xc',Xc);
                    console.log('Yc',Yc);
                    console.log('phi',phi);
                    console.log('Fixing');
                    Xc = Xc.toFixed(4);
                    Yc = Yc.toFixed(4);
                    phi = phi.toFixed(4);
                    console.log('Xc',Xc);
                    console.log('Yc',Yc);
                    console.log('phi',phi);
					xContent = xContent.concat(Xc).concat(',');
					yContent = yContent.concat(Yc).concat(',');
					
					phiContent = phiContent.concat(phi).concat(',');
					count = count + 1;
					prevXc = Xc;
					prevYc = Yc;
				}
				
			}
            var content = '';
			content = content.concat(count.toString()).concat('\n').concat(xContent).concat('\n').concat(yContent).concat('\n').concat(phiContent).concat('\n');
			var blob = new Blob([content], {type: "text/plain;charset=ISO-8859-1"});
			saveAs(blob, "path.csv");

		}

