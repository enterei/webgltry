var points= [];
function Cube(gl,inittrans){

    
    if (Cube.shaderProgram === undefined) {
        console.log("jau vor dem laden");
        Cube.shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
        
        if (Cube.shaderProgram === null) {
            throw new Error('Creating the shader program failed.');
        }
        Cube.locations = {
            attribute: {
                aPosition: gl.getAttribLocation(Cube.shaderProgram, "aPosition"),
                aColor: gl.getAttribLocation(Cube.shaderProgram, "aColor"),
               
            },
            uniform: {
                uMMatrix: gl.getUniformLocation(Cube.shaderProgram, "uMMatrix"),
               
                uPMatrix: gl.getUniformLocation(Cube.shaderProgram, "uPMatrix")
            }
        };
        gl.enableVertexAttribArray(Cube.locations.attribute.aPosition);
        gl.enableVertexAttribArray(Cube.locations.attribute.aColor);
        gl.enableVertexAttribArray(Cube.locations.attribute.aNormal);
    }

    if (Cube.buffers === undefined) {
        fillpoints();
        // Create a buffer with the vertex positions
        // 3 coordinates per vertex, 3 vertices per triangle
        // 2 triangles make up the ground plane, 4 triangles make up the sides
        const pBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
        
       
        
        
  
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
        
        // Create a buffer with the vertex colors
        const cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        
       
        
        Cube.buffers = {
            pBuffer: pBuffer,
            cBuffer: cBuffer,
          
            pComponents: 3, // number of components per vertex in pBuffer
            cComponents: 3, // number of components per color in cBuffer
            
        };
        
    }
    this.position = inittrans;
    //this.oldpos=this.position;
    
    this.rotationY = 0.0;
    this.rotationX = 0.0;
    this.rotationZ = 0.0;
    this.rotaM = mat4.create();

   
    
    this.scaleY = 0.0;
    this.scaleX = 0.0;
    this.scaleZ = 0.0;
    this.scaleM=[1.0,1.0,1.0];



    this.mMatrix = mat4.create();
    this.mMatrixTInv = mat3.create();


    this.draw = function(gl, pMatrix) {
        gl.useProgram(Cube.shaderProgram);
        gl.uniformMatrix4fv(Cube.locations.uniform.uPMatrix, false, pMatrix);
        gl.uniformMatrix4fv(Cube.locations.uniform.uMMatrix, false, this.mMatrix);
        
        gl.uniform4fv(Cube.locations.uniform.uColor, [1.0, 0.0, 0.0, 1.0]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, Cube.buffers.pBuffer);
        gl.vertexAttribPointer(Cube.locations.attribute.aPosition,
                               Cube.buffers.pComponents,
                               gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, Cube.buffers.cBuffer);
        gl.vertexAttribPointer(Cube.locations.attribute.aColor,
                               Cube.buffers.cComponents,
                               gl.FLOAT, false, 0, 0);
     
//       console.log(this.position);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    };
    
    /*this.update = function(delta,t,s,r) {
        console.log("sollte nei vorkommen !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        for(var i = 0;i<3;i++) this.position[i]+=t[i];

     
        this.rotationX+=r[0];
        this.rotationY+=r[1];
        this.rotationZ+=r[2];

        this.scaleY =s[1];
        this.scaleX = s[0];
        this.scaleZ = s[2];
     

      // mat4.identity(this.mMatrix);
       var ctm = mat4.create();
      /*if(this.position!=this.oldpos){
        mat4.translate(this.mMatrix, this.mMatrix, this.position);
        this.oldpos=this.position;

    }*/
  //  mat4.translate(this.mMatrix, this.mMatrix, this.position);
  /*  mat4.rotateY(ctm, ctm ,this.rotationY);
    mat4.rotateX(ctm, ctm, this.rotationX);
    mat4.rotateZ(ctm, ctm, this.rotationZ);
    mat4.translate(ctm, ctm, t);  
    
        mat4.multiply(this.mMatrix,this.mMatrix,ctm);
      
        mat4.identity(ctm);

      //  mat4.scale(this.mMatrix,this.mMatrix,[this.scaleX,this.scaleY,this.scaleZ]);
        
        
        
      
    };
*/
    this.updateRota=function(r){
        console.log("s");
      /*  mat4.rotateX(this.mMatrix,this.mMatrix,r[0]);
        mat4.rotateY(this.mMatrix,this.mMatrix,r[1]);
        mat4.rotateZ(this.mMatrix,this.mMatrix,r[2]);*/

        var backTrans = [];
        for(var i = 0;i<3;i++)backTrans[i]=this.position[i]*-1;
        console.log(this.rotaM);
        console.log(this.position);
        console.log(backTrans);
        mat4.translate(this.rotaM,this.rotaM,backTrans);
        console.log(this.rotaM);
        mat4.rotateX(this.rotaM,this.rotaM,r[0]);
        mat4.rotateY(this.rotaM,this.rotaM,r[1]);
        mat4.rotateZ(this.rotaM,this.rotaM,r[2]);
      //  mat4.translate(this.rotaM,this.rotaM,this.position);
       this.updateAll();

    };
    this.updateGlRota=function(r){
        var backTrans = [];
        for(var i = 0;i<3;i++)backTrans[i]=this.position[i]*-1;
        console.log("habede");
        var ctm = mat4.create();
       
        mat4.translate(ctm,ctm,this.position);
        console.log(ctm);
        var ii = 0-this.position[0];
        console.log(ii);

        mat4.rotate(ctm,ctm,r[0],[1-ii,0,0]);
        mat4.rotate(ctm,ctm,r[1],[0,1,0]);
        mat4.rotate(ctm,ctm,r[2],[0,0,1]);
        console.log(ctm);



//        mat4.rotateX(ctm,ctm,r[0]);
  //      mat4.rotateY(ctm,ctm,r[1]);
    //    mat4.rotateZ(ctm,ctm,r[2]);
        
        mat4.translate(ctm,ctm,backTrans);
   //     console.log(ctm);
       // mat4.multiply(this.mMatrix,this.mMatrix,mat4.fromRotation())
        
    //    mat4.multiply(this.mMatrix,ctm,this.mMatrix);
       mat4.multiply(this.mMatrix,this.mMatrix,ctm);
      //  mat4.translate(this.mMatrix,this.mMatrix,this.position);
      //  mat4.rotateX(this.mMatrix,this.mMatrix,r[0]);
       // mat4.rotateY(this.mMatrix,this.mMatrix,r[1]);
       // mat4.rotateY(this.mMatrix,this.mMatrix,r[2]);
        //mat4.translate(this.mMatrix,this.mMatrix,backTrans);

       
        

    };
    this.updateTrans= function(t){
        for(var i = 0;i<3;i++) this.position[i]+=t[i];
       // mat4.translate(this.mMatrix,this.mMatrix,t);
       console.log("habede");
       this.updateAll();
    };

    this.updateScale = function(s){
        mat4.scale(this.mMatrix,this.mMatrix,s);
    };

    this.updateAll= function(){
        mat4.identity(this.mMatrix);
       /* console.log(this.mMatrix);
        console.log(this.rotaM);
        console.log(this.position);
        console.log(this.scaleM);*/
        mat4.multiply(this.mMatrix,this.mMatrix,this.rotaM);
        mat4.translate(this.mMatrix,this.mMatrix,this.position);
        
        
        

  //      mat4.fromRotationTranslationScale(this.mMatrix,this.rotaM,this.position,this.scaleM);
    }

}








function fillpoints(){
    cube_indices
    for (var i = 0; i < cube_indices.length; ++i) {
       var x = cube_vertices[cube_indices[i]];  
       points.push(x[0]);   
       points.push(x[1]);  
       points.push(x[2]);     
    }

}


var colors = [
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     1.0, 0.0, 0.0 ,
     1.0, 0.0, 0.0 ,
     1.0, 0.0, 0.0 ,
     1.0, 0.0, 0.0 ,
     1.0, 0.0, 0.0 ,
     1.0, 0.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
  

];


var cube_vertices = [
    [-0.1, -0.1, 0.1],
    [-0.1, 0.1, 0.1],
    [0.1, 0.1, 0.1],
    [0.1, -0.1, 0.1],
    [-0.1, -0.1, -0.1],
    [-0.1, 0.1, -0.1],
    [0.1, 0.1, -0.1],
    [0.1, -0.1, -0.1]
];



var cube_indices = [

    0, 1, 2, 0, 2, 3,
    3, 2, 6, 3, 6, 7,
    7, 6, 5, 7, 4, 5,
    5, 6, 2, 5, 1, 2,
    1, 0, 4, 1, 5, 4,
    4, 7, 3, 4, 0, 3,

];