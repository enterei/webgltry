function main(){
    init();
}
function init(){
    const canvas = document.getElementById("glCanvas");
    const gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(1.0, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);


    let pMatrix = mat4.create();
    const asp = canvas.clientWidth/canvas.clientHeight;
    const bottom = -1;
    const zNear = 0.001;
    const zFar = 100;
    mat4.ortho(pMatrix, -asp, asp, bottom, -bottom, zNear, zFar);
   // perspectiveMatrix=perspective(45,canvas.width/canvas.height,0.0,1);
    try {
        var object = new Object(gl);
    } catch (E) {
        alert(E);
        return;
    }
    var then = 0;
    function render(now) {
        // calculate time per frame (seconds)
        now *= 0.001;
        const delta = now - then;
        then = now;
        
        pyramid.update(delta);
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        pyramid.draw(gl, pMatrix);
        
        requestAnimationFrame(render);
    }
    
    // Start rendering
    requestAnimationFrame(render);
    


}