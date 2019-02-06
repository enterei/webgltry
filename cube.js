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
    this.rotationY = 0;
    this.rotationX = 0.5;
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
     
       
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    };
    
    this.update = function(delta) {
        this.rotationY += 0.5*delta;
       // this.rotationX += 0.1*delta;
        
        // set the current model matrix
        mat4.identity(this.mMatrix);
        mat4.translate(this.mMatrix, this.mMatrix, this.position);
        mat4.rotateY(this.mMatrix, this.mMatrix, this.rotationY);
        mat4.rotateX(this.mMatrix, this.mMatrix, this.rotationX);
        
        
        // compute the inverse transpose of the 3x3 submatrix of the model matrix
        mat3.normalFromMat4(this.mMatrixTInv, this.mMatrix);
    };

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