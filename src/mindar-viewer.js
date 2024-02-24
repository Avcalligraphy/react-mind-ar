import React, { useEffect } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function MindARViewer() {
  useEffect(() => {
    const sceneEl = document.querySelector("a-scene");
    if (sceneEl) {
      const arSystem = sceneEl.systems["mindar-image-system"];
      sceneEl.addEventListener("renderstart", () => {
        arSystem.start(); // start AR
      });

      // Clean-up function
      return () => {
        arSystem.stop();
      };
    } else {
      console.error("Elemen <a-scene> tidak ditemukan dalam DOM.");
    }
  }, []);

  // Fungsi untuk menyesuaikan posisi kamera berdasarkan perangkat
  const getCameraPosition = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return "0 0 0.5"; // Posisi kamera untuk perangkat mobile
    } else {
      return "0 0 0"; // Posisi kamera untuk perangkat non-mobile
    }
  };

  return (
    <a-scene
      mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind; autoStart: true; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <img
          id="card"
          src="https://firebasestorage.googleapis.com/v0/b/webar-609e0.appspot.com/o/pattern%2FGl53GGRivn_asset.jpeg?alt=media&token=cbf1d70b-bc61-4dac-9c85-27afce28a3dd"
        />
        <a-asset-item
          id="avatarModel"
          src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
        ></a-asset-item>
      </a-assets>

      {/* Menyesuaikan posisi kamera berdasarkan perangkat */}
      <a-camera
        position={getCameraPosition()}
        look-controls="enabled: false"
      ></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-plane
          src="#card"
          position="0 0 0"
          height="0.552"
          width="1"
          rotation="0 0 0"
        ></a-plane>
        {/* <a-gltf-model
          rotation="0 0 0 "
          position="0 0 0.1"
          scale="0.005 0.005 0.005"
          src="#avatarModel"
          animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model> */}
      </a-entity>
    </a-scene>
  );
}
