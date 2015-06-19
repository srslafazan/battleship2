//
//  BoardViewController.swift
//  iosProject
//
//  Created by Shain Lafazan on 6/18/15.
//  Copyright (c) 2015 Shain Lafazan. All rights reserved.
//

import UIKit

class BoardViewController: UIViewController {
    
    let socket = SocketIOClient(socketURL: "192.168.1.125:8000", options: ["log": true])
    // "192.168.1.125:74.61.150.47"
    @IBOutlet var spaces: [customButton]!
    
    override func prefersStatusBarHidden() -> Bool {
        return true
    }
    
    
    var location = CGPoint(x: 0, y: 0)
    
    @IBOutlet weak var ship1: UIImageView!
    @IBOutlet weak var ship2: UIImageView!
    @IBOutlet weak var ship3: UIImageView!
    @IBOutlet weak var ship4: UIImageView!
    var ship1set:Bool = false
    var ship2set:Bool = false
    var ship3set:Bool = false
    var ship4set:Bool = false
    var shipLocations: [[Int]] = []
    var count = 0
    
    
    @IBOutlet weak var startButton: UIButton!
    @IBAction func startButtonPressed(sender: AnyObject) {
        socket.emit("startButtonPressed", shipLocations)
    }
    
    override func touchesBegan(touches: Set<NSObject>, withEvent event: UIEvent) {
        var touch : UITouch! = touches.first as! UITouch
        
        location = touch.locationInView(self.view)
        println(self)

        
        
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

        
//        println("new ship1 center is: ")
//        println(location)
      
        
        if ship1.layer.presentationLayer().frame.contains(location) && !ship1set{
            ship1.center = location
        } else if ship2.layer.presentationLayer().frame.contains(location) && !ship2set{
            ship2.center = location
        } else if ship3.layer.presentationLayer().frame.contains(location) && !ship3set{
            ship3.center = location
        } else if ship4.layer.presentationLayer().frame.contains(location) && !ship4set{
            ship4.center = location
        }
    }
    
    
    
    override func touchesEnded(touches: Set<NSObject>, withEvent event: UIEvent) {
        var touch : UITouch! = touches.first as! UITouch
        
        location = touch.locationInView(self.view)
        
        if ship1.layer.presentationLayer().frame.contains(location){
            checkCenter(ship1)
        } else if ship2.layer.presentationLayer().frame.contains(location){
            checkCenter(ship2)
        } else if ship3.layer.presentationLayer().frame.contains(location){
            checkCenter(ship3)
        } else if ship4.layer.presentationLayer().frame.contains(location){
            checkCenter(ship4)
        }
    }
    
    func checkCenter(ship: UIImageView) {
        
        println("checkCenter")
        var halfHeight = ship.frame.size.height/2
        for (var i = 2; i<=99; i+=10){
            for (var j = i; j <= (i+6); j++){
                var space = spaces[j]
                if CGFloat(abs(Double(ship.center.y) - Double(space.center.y))) <= halfHeight
                {
                    if CGFloat(abs(Double(ship.center.x) - Double(space.center.x))) <= halfHeight
                    {
                        ship.center = space.center
                        if ship === ship1{
                            ship1set = true
                            println(ship1set)
                        } else if ship === ship2{
                            ship2set = true
                            println(ship2set)
                        } else if ship === ship3{
                            ship3set = true
                            println(ship3set)
                        } else if ship === ship4{
                            ship4set = true
                            println(ship4set)
                        }
                        
                        shipLocations.append([(space.tag - 2), (space.tag - 1), (space.tag), (space.tag + 1), (space.tag + 2)])
                        count++
                        if count > 3 {
                            startButton.hidden = false
                        }
                        println(shipLocations)
                    }
                }
            }
        }
    }
    
    override func viewDidLoad() {

        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        println(self.ship3.frame.size)
        println(self.ship3.frame.width)
//        ship1.center.x = ship1.frame.size.width/2
       
        startButton.hidden = true
        
//        println("button1 center")
//        for space in spaces {
//            println(space.tag)
//        }
        
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

