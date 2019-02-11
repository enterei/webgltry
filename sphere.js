var sphere_points= [];
function Sphere(gl,inittrans){

    
    if (Sphere.shaderProgram === undefined) {
        console.log("jau vor dem laden");
        Sphere.shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
        
        if (Sphere.shaderProgram === null) {
            throw new Error('Creating the shader program failed.');
        }
        Sphere.locations = {
            attribute: {
                aPosition: gl.getAttribLocation(Sphere.shaderProgram, "aPosition"),
                aColor: gl.getAttribLocation(Sphere.shaderProgram, "aColor"),
               
            },
            uniform: {
                uMMatrix: gl.getUniformLocation(Sphere.shaderProgram, "uMMatrix"),
               
                uPMatrix: gl.getUniformLocation(Sphere.shaderProgram, "uPMatrix")
            }
        };
        gl.enableVertexAttribArray(Sphere.locations.attribute.aPosition);
        gl.enableVertexAttribArray(Sphere.locations.attribute.aColor);
        gl.enableVertexAttribArray(Sphere.locations.attribute.aNormal);
    }

    if (Sphere.buffers === undefined) {
        fillSpoints();
        // Create a buffer with the vertex positions
        // 3 coordinates per vertex, 3 vertices per triangle
        // 2 triangles make up the ground plane, 4 triangles make up the sides
        const pBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
        
       
        
        
  
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere_points), gl.STATIC_DRAW);
        
        // Create a buffer with the vertex colors
        const cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        
       
        
        Sphere.buffers = {
            pBuffer: pBuffer,
            cBuffer: cBuffer,
          
            pComponents: 3, // number of components per vertex in pBuffer
            cComponents: 3, // number of components per color in cBuffer
            
        };
        
    }
    
    this.position = inittrans;
    this.transM = mat4.create();
    //this.oldpos=this.position;
    
    this.rotationY = 0.0;
    this.rotationX = 0.0;
    this.rotationZ = 0.0;
    this.rotaM = mat4.create();

   
    
    this.scaleY = 0.0;
    this.scaleX = 0.0;
    this.scaleZ = 0.0;
    this.scaleM=mat4.create();



    this.mMatrix = mat4.create();
    this.mMatrixTInv = mat3.create();


    this.draw = function(gl, pMatrix) {
        gl.useProgram(Sphere.shaderProgram);
        gl.uniformMatrix4fv(Sphere.locations.uniform.uPMatrix, false, pMatrix);
        gl.uniformMatrix4fv(Sphere.locations.uniform.uMMatrix, false, this.mMatrix);
        
        gl.uniform4fv(Sphere.locations.uniform.uColor, [1.0, 0.0, 0.0, 1.0]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, Sphere.buffers.pBuffer);
        gl.vertexAttribPointer(Sphere.locations.attribute.aPosition,
                               Sphere.buffers.pComponents,
                               gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, Sphere.buffers.cBuffer);
        gl.vertexAttribPointer(Sphere.locations.attribute.aColor,
                               Sphere.buffers.cComponents,
                               gl.FLOAT, false, 0, 0);
     
//       console.log(this.position);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    };
    

    this.updateRota=function(r){
        console.log("s");
   
        mat4.rotateX(this.rotaM,this.rotaM,r[0]);
        mat4.rotateY(this.rotaM,this.rotaM,r[1]);
        mat4.rotateZ(this.rotaM,this.rotaM,r[2]);
      //  mat4.translate(this.rotaM,this.rotaM,this.position);
       this.updateAll();

    };
    this.updateGlRota=function(r){
       var help = mat4.create();
       var lr = mat4.create();
       mat4.rotateX(lr,lr,r[0]);
       mat4.rotateY(lr,lr,r[1]);
       mat4.rotateZ(lr,lr,r[2]);
       var trinv = mat4.create();
       mat4.invert(trinv,this.transM);

       mat4.multiply(help,this.transM,lr);
       mat4.multiply(help,help,trinv);
       mat4.multiply(this.rotaM,this.rotaM,help);
       this.updateAll();
       
        

    };
    this.updateTrans = function (t) {
        var lt = mat4.create();
        mat4.translate(lt, lt, t);
        var help = mat4.create();
        var rotainv = mat4.create();
        mat4.invert(rotainv, this.rotaM);

        //   rechnungen
        mat4.multiply(help, this.rotaM, lt);       
        mat4.multiply(help, help, rotainv);
        mat4.multiply(this.transM, this.transM, help);
       





        // mat4.multiply(this.transM,this.transM,help);



        console.log("habede");
        this.updateAll();
    };

    this.updateScale = function(s){
        mat4.scale(this.scaleM,this.scaleM,s);
        this.updateAll();
    };

    this.updateAll= function(){
        mat4.identity(this.mMatrix);
        


        mat4.multiply(this.mMatrix,this.mMatrix,this.transM);
      
        mat4.multiply(this.mMatrix,this.mMatrix,this.rotaM);
        mat4.multiply(this.mMatrix,this.mMatrix,this.scaleM);
     //  mat4.multiply(this.mMatrix,this.transM,this.rotaM);
  
    }

}








function fillSpoints(){

    for (var i = 0; i < sphere_indices.length; ++i) {
       var x = sphere_vertices[sphere_indices[i]];  
       sphere_points.push(x[0]);   
       sphere_points.push(x[1]);  
       sphere_points.push(x[2]);     
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


var sphere_vertices = [
    [-0.1, -0.1, 0.1],
    [-0.1, 0.1, 0.1],
    [0.1, 0.1, 0.1],
    [0.1, -0.1, 0.1],
    [-0.1, -0.1, -0.1],
    [-0.1, 0.1, -0.1],
    [0.1, 0.1, -0.1],
    [0.1, -0.1, -0.1]
];



var sphere_indices = [

    0, 1, 2, 0, 2, 3,
    3, 2, 6, 3, 6, 7,
    7, 6, 5, 7, 4, 5,
    5, 6, 2, 5, 1, 2,
    1, 0, 4, 1, 5, 4,
    4, 7, 3, 4, 0, 3,

];