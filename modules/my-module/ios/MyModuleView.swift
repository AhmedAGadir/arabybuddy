import ExpoModulesCore
import UIKit
import GLTFKit2

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class MyModuleView: ExpoView {
    var animationValue = ""
    var view = UIView()

    public let environmentLightName = "studio.hdr"
    public let environmentIntensity = 0.8

    var sceneView: SCNView!
    let assetContainerNode = SCNNode()

    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)

        addSubview(view)

        sceneView = SCNView(frame: view.frame)
        sceneView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        sceneView.backgroundColor = UIColor.white
        sceneView.antialiasingMode = .multisampling4X
        sceneView.autoenablesDefaultLighting = false
        sceneView.allowsCameraControl = true
        sceneView.defaultCameraController.interactionMode = .orbitTurntable

        view.addSubview(sceneView)

        // Set up the Scene
        let scene = SCNScene()
        scene.rootNode.addChildNode(assetContainerNode)
        scene.lightingEnvironment.contents = environmentLightName
        scene.lightingEnvironment.intensity = environmentIntensity
        sceneView.scene = scene
    }

    override func layoutSubviews() {
        view.frame = bounds
    }

        func setup(animation: String) {
        animationValue = animation
        if let glbURL = Bundle.main.url(forResource: "Fox", withExtension: "glb") {
            loadAsset(url: glbURL) { error in
                debugPrint("Error \(error?.localizedDescription)")
            }
        } else {
            print("FlightHelmet.glb not found in the main bundle.")
        }
    }

        private func loadAsset(url assetURL: URL, completionHandler handler: @escaping (Error?) -> Void) {
        GLTFAsset.load(with: assetURL, options: [:]) { (progress, status, maybeAsset, maybeError, _) in
            DispatchQueue.main.async {
                if status == .complete {
                    if let asset = maybeAsset {
                        self.prepareAsset(asset, completionHandler: handler)
                    } 
                } else {
                    handler(maybeError)
                }
            }
        }
    }

        private func prepareAsset(_ asset: GLTFAsset, completionHandler handler: @escaping (Error?) -> Void) {
        let source = GLTFSCNSceneSource(asset: asset)

        guard let assetScene = source.defaultScene else {
            handler(nil)
            return
        }

        for node in assetScene.rootNode.childNodes {
            assetContainerNode.addChildNode(node)
        }

        for gltfAnimation in source.animations {
            if gltfAnimation.name == animationValue {
                // Use the built-in animation player
                let player = gltfAnimation.animationPlayer
                assetContainerNode.addAnimationPlayer(player, forKey: animationValue)
                player.play()
                break
            }
        }

        DispatchQueue.main.async {
            guard let scene = self.sceneView.scene else { return }

            self.sceneView.prepare([scene]) { _ in
                DispatchQueue.main.async {
                    handler(nil)
                }
            }
        }
    }
}