//
//  BoardViewController.swift
//  iosProject
//
//  Created by Shain Lafazan on 6/18/15.
//  Copyright (c) 2015 Shain Lafazan. All rights reserved.
//

import UIKit

class BoardViewController: UIViewController {
    
    override func prefersStatusBarHidden() -> Bool {
        return true
    }
    
    
    var location = CGPoint(x: 0, y: 0)
    
    @IBOutlet weak var ship1: UIImageView!
    @IBOutlet weak var ship2: UIImageView!
    @IBOutlet weak var ship3: UIImageView!
    @IBOutlet weak var ship4: UIImageView!
    
    override func touchesBegan(touches: Set<NSObject>, withEvent event: UIEvent) {
        var touch : UITouch! = touches.first as! UITouch
        
        location = touch.locationInView(self.view)

        
        
        println("touch began: ")
        println(location)

        if ship1.layer.presentationLayer().frame.contains(location){
                ship1.center = location
        } else if ship2.layer.presentationLayer().frame.contains(location){
                ship2.center = location
        } else if ship3.layer.presentationLayer().frame.contains(location){
                ship3.center = location
        } else if ship4.layer.presentationLayer().frame.contains(location){
                ship4.center = location
        }
    }
    

    
    override func touchesMoved(touches: Set<NSObject>, withEvent event: UIEvent) {
        
        var touch : UITouch! = touches.first as! UITouch
        
        location = touch.locationInView(self.view)

        
        println("new ship1 center is: ")
        println(location)
      
        
        if ship1.layer.presentationLayer().frame.contains(location){
            ship1.center = location
        } else if ship2.layer.presentationLayer().frame.contains(location){
            ship2.center = location
        } else if ship3.layer.presentationLayer().frame.contains(location){
            ship3.center = location
        } else if ship4.layer.presentationLayer().frame.contains(location){
            ship4.center = location
        }

    }
    
    override func touchesEnded(touches: Set<NSObject>, withEvent event: UIEvent) {
        
    }
    
    @IBOutlet weak var space: UIButton!

    let socket = SocketIOClient(socketURL: "192.168.1.154:8000", options: ["log": true])
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        println(self.ship3.frame.size)
        println(self.ship3.frame.width)
     
        
        socket.on("error") { data, ack in
            println("got an error bro")
            println(data)
            println(ack)
        }
        
        socket.on("connect") { data, ack in
            println("socket connected")
        }
        
        socket.connect()
        
        ship1.center = CGPointMake(160, 330)
    }

    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

