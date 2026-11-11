"""
3D Neural Core Component for KnowledgeAI Streamlit App
Renders interactive WebGL Three.js canvas or High-Res 3D Obsidian Sculpture
"""

import base64
import os
import streamlit.components.v1 as components

def get_sculpture_base64():
    asset_path = os.path.join(os.path.dirname(__file__), "assets", "ai-neural-core.png")
    if os.path.exists(asset_path):
        with open(asset_path, "rb") as f:
            data = f.read()
        return "data:image/png;base64," + base64.b64encode(data).decode()
    return ""

def render_threejs_canvas(height=480):
    html_code = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        html, body {{
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #0f131d;
        }}
        #canvas-container {{
          width: 100%;
          height: {height}px;
          position: relative;
        }}
        .hud-overlay {{
          position: absolute;
          bottom: 12px;
          left: 16px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: #4cd7f6;
          pointer-events: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }}
      </style>
    </head>
    <body>
      <div id="canvas-container">
        <div class="hud-overlay">● WebGL 3D Intelligence Sphere · Move cursor to rotate</div>
      </div>
      <script>
        (function() {{
          const container = document.getElementById('canvas-container');
          const width = container.clientWidth || window.innerWidth;
          const height = container.clientHeight || {height};

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
          camera.position.z = 7;

          const renderer = new THREE.WebGLRenderer({{ alpha: true, antialias: true }});
          renderer.setSize(width, height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          container.appendChild(renderer.domElement);

          // Core Group
          const coreGroup = new THREE.Group();
          scene.add(coreGroup);

          // 1. Inner Glowing Nucleus
          const nucleusGeo = new THREE.IcosahedronGeometry(1.2, 3);
          const nucleusMat = new THREE.MeshPhongMaterial({{
            color: 0x4f46e5,
            emissive: 0x2563eb,
            emissiveIntensity: 0.85,
            shininess: 90,
            transparent: true,
            opacity: 0.85
          }});
          const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
          coreGroup.add(nucleus);

          // 2. Translucent Glass Shell
          const outerShellGeo = new THREE.SphereGeometry(1.75, 48, 48);
          const outerShellMat = new THREE.MeshPhongMaterial({{
            color: 0x818cf8,
            transparent: true,
            opacity: 0.35,
            shininess: 100
          }});
          const outerShell = new THREE.Mesh(outerShellGeo, outerShellMat);
          coreGroup.add(outerShell);

          // 3. Neural Lattice Cage
          const latticeGeo = new THREE.IcosahedronGeometry(2.1, 1);
          const latticeMat = new THREE.MeshBasicMaterial({{
            color: 0x38bdf8,
            wireframe: true,
            transparent: true,
            opacity: 0.45
          }});
          const lattice = new THREE.Mesh(latticeGeo, latticeMat);
          coreGroup.add(lattice);

          // 4. Lattice Nodes
          const nodePositions = latticeGeo.attributes.position;
          const nodesGeo = new THREE.SphereGeometry(0.06, 12, 12);
          const nodeMat = new THREE.MeshBasicMaterial({{ color: 0x93c5fd }});
          for(let i = 0; i < nodePositions.count; i += 3) {{
            const node = new THREE.Mesh(nodesGeo, nodeMat);
            node.position.set(
              nodePositions.getX(i),
              nodePositions.getY(i),
              nodePositions.getZ(i)
            );
            coreGroup.add(node);
          }}

          // 5. Orbital Rings
          const orbitalRings = [];
          const ringParams = [
            {{ rad: 2.5, rotX: 1.1, rotY: 0.3, col: 0x6366f1, speed: 0.008 }},
            {{ rad: 2.8, rotX: -0.8, rotY: 0.9, col: 0x0ea5e9, speed: -0.006 }},
            {{ rad: 3.1, rotX: 0.5, rotZ: 1.2, col: 0xa855f7, speed: 0.005 }}
          ];

          ringParams.forEach(param => {{
            const ringGeo = new THREE.RingGeometry(param.rad - 0.015, param.rad + 0.015, 64);
            const ringMat = new THREE.MeshBasicMaterial({{
              color: param.col,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.5
            }});
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = param.rotX;
            if(param.rotY) ring.rotation.y = param.rotY;
            if(param.rotZ) ring.rotation.z = param.rotZ;
            scene.add(ring);
            orbitalRings.push({{ mesh: ring, speed: param.speed }});
          }});

          // 6. Floating Knowledge Particles
          const particleCount = 220;
          const particlePositions = new Float32Array(particleCount * 3);
          const particleColors = new Float32Array(particleCount * 3);

          for(let i = 0; i < particleCount * 3; i += 3) {{
            const r = 2.0 + Math.random() * 2.2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
            particlePositions[i+1] = r * Math.sin(phi) * Math.sin(theta);
            particlePositions[i+2] = r * Math.cos(phi);

            particleColors[i] = 0.3 + Math.random() * 0.4;
            particleColors[i+1] = 0.6 + Math.random() * 0.4;
            particleColors[i+2] = 0.95;
          }}

          const particleGeo = new THREE.BufferGeometry();
          particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
          particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

          const particleMat = new THREE.PointsMaterial({{
            size: 0.07,
            vertexColors: true,
            transparent: true,
            opacity: 0.85
          }});
          const particles = new THREE.Points(particleGeo, particleMat);
          scene.add(particles);

          // Lighting
          const ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.4);
          scene.add(ambientLight);

          const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 20);
          pointLight1.position.set(4, 5, 4);
          scene.add(pointLight1);

          const pointLight2 = new THREE.PointLight(0x8b5cf6, 3.5, 20);
          pointLight2.position.set(-4, -3, 3);
          scene.add(pointLight2);

          // Mouse Parallax Interaction
          let mouseX = 0, mouseY = 0;
          let targetX = 0, targetY = 0;
          window.addEventListener('mousemove', (e) => {{
            const halfX = window.innerWidth / 2;
            const halfY = window.innerHeight / 2;
            targetX = (e.clientX - halfX) * 0.0006;
            targetY = (e.clientY - halfY) * 0.0006;
          }});

          window.addEventListener('resize', () => {{
            const newWidth = container.clientWidth || window.innerWidth;
            const newHeight = container.clientHeight || {height};
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
          }});

          // Animation Loop
          const clock = new THREE.Clock();
          function animate() {{
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            coreGroup.rotation.y += 0.006;
            coreGroup.rotation.x = Math.sin(time * 0.5) * 0.15;
            coreGroup.position.y = Math.sin(time * 1.2) * 0.15;

            lattice.rotation.y -= 0.003;
            nucleus.rotation.z += 0.004;

            orbitalRings.forEach(orb => {{
              orb.mesh.rotation.z += orb.speed;
            }});

            particles.rotation.y = time * 0.04;
            particles.rotation.x = Math.cos(time * 0.3) * 0.05;

            mouseX += (targetX - mouseX) * 0.05;
            mouseY += (targetY - mouseY) * 0.05;
            scene.rotation.y = mouseX;
            scene.rotation.x = mouseY;

            renderer.render(scene, camera);
          }}
          animate();
        }})();
      </script>
    </body>
    </html>
    """
    components.html(html_code, height=height, scrolling=False)
