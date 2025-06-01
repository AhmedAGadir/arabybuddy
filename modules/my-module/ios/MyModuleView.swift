// TESTING WITHOUT SCENEKIT/GLTF -> THIS WORKS ✅ ✅ -> CAN SEE LOGS IN MAC OS CONSOLE APP 

import ExpoModulesCore
import UIKit
import GLTFKit2 

class MyModuleView: ExpoView {
    @objc var animationValue: String = ""
    var view = UIView()

    public let environmentLightName = "studio.hdr"
    public let environmentIntensity = 0.8

    // Commented out SceneKit use
    var sceneView: SCNView!
    let assetContainerNode = SCNNode()

    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)

        NSLog("✅ init called")

        // addSubview(view)
        // view.backgroundColor = .systemGreen

        // sceneView = SCNView(frame: view.frame)
        // sceneView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        // sceneView.backgroundColor = UIColor.white
        // sceneView.antialiasingMode = .multisampling4X
        // sceneView.autoenablesDefaultLighting = false
        // sceneView.allowsCameraControl = true
        // sceneView.defaultCameraController.interactionMode = .orbitTurntable

        // view.addSubview(sceneView)

        // let scene = SCNScene()
        // scene.rootNode.addChildNode(assetContainerNode)
        // scene.lightingEnvironment.contents = environmentLightName
        // scene.lightingEnvironment.intensity = environmentIntensity
        // sceneView.scene = scene

        // NSLog("✅ MyModuleView initialized without SceneKit/GLTF")
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        view.frame = bounds
        NSLog("📐 layoutSubviews called")
    }

    @objc func setup(animation: String) {
        NSLog("🎬 setup(animation:) called with:", animation)
        animationValue = animation

        if let glbURL = Bundle.main.url(forResource: "Fox", withExtension: "glb") {
            NSLog("📦 Found .glb file at \(glbURL)")
            loadAsset(url: glbURL) { error in
                if let error = error {
                    NSLog("❌ Asset load error: \(error.localizedDescription)")
                } else {
                    NSLog("✅ Asset load simulation complete")
                }
            }
        } else {
            NSLog("❌ Fox.glb not found in the main bundle.")
        }
    }

    private func loadAsset(url assetURL: URL, completionHandler handler: @escaping (Error?) -> Void) {
        NSLog("🚚 Simulating GLTFAsset.load for URL: \(assetURL)")
        // Simulate async success
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            NSLog("✅ loadAsset simulation complete")
            self.prepareAsset(nil, completionHandler: handler)
        }
    }

    private func prepareAsset(_ asset: Any?, completionHandler handler: @escaping (Error?) -> Void) {
        NSLog("🔧 prepareAsset called")

        /*
        let source = GLTFSCNSceneSource(asset: asset)
        guard let assetScene = source.defaultScene else {
            NSLog("❌ No default scene found")
            handler(...)
            return
        }
        */

        NSLog("ℹ️ Simulating scene and animation preparation")

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            NSLog("✅ prepareAsset simulation complete")
            handler(nil)
        }
    }
}

// // ============================
// // ============================

// CODE BELOW DOES NOT WORK ❌ - PLEASE FIX 🔧🔧🔧🔧

// // ============================
// // ============================

// import ExpoModulesCore
// import UIKit
// import GLTFKit2

// class MyModuleView: ExpoView {
//     var animationValue = ""
//     var view = UIView()

//     public let environmentLightName = "studio.hdr"
//     public let environmentIntensity = 0.8

//     var sceneView: SCNView!
//     let assetContainerNode = SCNNode()

//     required init(appContext: AppContext? = nil) {
//         super.init(appContext: appContext)

//         addSubview(view)

//         sceneView = SCNView(frame: view.frame)
//         sceneView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
//         sceneView.backgroundColor = UIColor.white
//         sceneView.antialiasingMode = .multisampling4X
//         sceneView.autoenablesDefaultLighting = false
//         sceneView.allowsCameraControl = true
//         sceneView.defaultCameraController.interactionMode = .orbitTurntable

//         view.addSubview(sceneView)

//         // Set up the Scene
//         let scene = SCNScene()
//         scene.rootNode.addChildNode(assetContainerNode)
//         scene.lightingEnvironment.contents = environmentLightName
//         scene.lightingEnvironment.intensity = environmentIntensity
//         sceneView.scene = scene

//         NSLog("✅ Scene initialized successfully")
//     }

//     override func layoutSubviews() {
//         view.frame = bounds
//     }

//     func setup(animation: String) {
//         animationValue = animation
//         if let glbURL = Bundle.main.url(forResource: "Fox", withExtension: "glb") {
//             NSLog("📦 Found .glb file at \(glbURL)")
//             loadAsset(url: glbURL) { error in
//                 if let error = error {
//                     NSLog("❌ Asset load error: \(error.localizedDescription)")
//                 } else {
//                     NSLog("✅ Asset loaded successfully")
//                 }
//             }
//         } else {
//             NSLog("❌ Fox.glb not found in the main bundle.")
//         }
//     }

//     private func loadAsset(url assetURL: URL, completionHandler handler: @escaping (Error?) -> Void) {
//         GLTFAsset.load(with: assetURL, options: [:]) { (progress, status, maybeAsset, maybeError, _) in
//             DispatchQueue.main.async {
//                 if status == .complete {
//                     if let asset = maybeAsset {
//                         NSLog("✅ GLTF asset load complete")
//                         self.prepareAsset(asset, completionHandler: handler)
//                     } else {
//                         NSLog("❌ Asset is nil even though status is complete")
//                         handler(maybeError ?? NSError(domain: "GLTF", code: -1, userInfo: [NSLocalizedDescriptionKey: "Asset was nil."]))
//                     }
//                 } else {
//                     NSLog("❌ GLTF loading failed with status \(status)")
//                     handler(maybeError ?? NSError(domain: "GLTF", code: -2, userInfo: [NSLocalizedDescriptionKey: "Load status not complete."]))
//                 }
//             }
//         }
//     }

//     private func prepareAsset(_ asset: GLTFAsset, completionHandler handler: @escaping (Error?) -> Void) {
//         let source = GLTFSCNSceneSource(asset: asset)
//         NSLog("🔍 Preparing GLTF asset")

//         guard let assetScene = source.defaultScene else {
//             NSLog("❌ No default scene found in GLTF source")
//             handler(NSError(domain: "GLTF", code: -3, userInfo: [NSLocalizedDescriptionKey: "No default scene"]))
//             return
//         }

//         for node in assetScene.rootNode.childNodes {
//             assetContainerNode.addChildNode(node)
//         }

//         var animationMatched = false

//         for gltfAnimation in source.animations {
//             if gltfAnimation.name == animationValue {
//                 NSLog("🎬 Found matching animation: \(gltfAnimation.name ?? "Unnamed")")
//                 let player = gltfAnimation.animationPlayer
//                 assetContainerNode.addAnimationPlayer(player, forKey: animationValue)
//                 player.play()
//                 animationMatched = true
//                 break
//             }
//         }

//         if !animationMatched {
//             NSLog("⚠️ No matching animation found for: \(animationValue)")
//         }

//         DispatchQueue.main.async {
//             guard let scene = self.sceneView.scene else {
//                 NSLog("❌ sceneView.scene is nil")
//                 handler(NSError(domain: "SceneKit", code: -4, userInfo: [NSLocalizedDescriptionKey: "Scene is nil"]))
//                 return
//             }

//             self.sceneView.prepare([scene]) { _ in
//                 DispatchQueue.main.async {
//                     NSLog("✅ Scene prepared and ready")
//                     handler(nil)
//                 }
//             }
//         }
//     }
// }