//
//  OpponentBoardViewController.swift
//  iosProject
//
//  Created by Paula Chojnacki on 6/18/15.
//  Copyright (c) 2015 Shain Lafazan. All rights reserved.
//

import UIKit

class OpponentBoardViewController: UIViewController {

    let socket = SocketIOClient(socketURL: "192.168.1.125:8000", options: ["log": true])
    
    @IBOutlet var gameSpaces: [customButton]!
    
// logic to disable board
    //            for space in gameSpaces {
    //                space.enabled = false
    //            }

    
    
    @IBAction func gameSpacePressed(sender: AnyObject) {
        println("game space pressed \(sender.tag)")
        println(socket)
            socket.emit("gameBoardPressed", sender.tag)
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        socket.connect()
        
        socket.on("connect") { data, ack in
            println("socket connected")
        }
        
        socket.on("otherPlayerStarts") { data, ack in
            println("otherPlayerStarts")
            
        }
        socket.on("thisPlayerStarts") { data, ack in
            println("thisPlayerStarts")
            
        }
        socket.on("waitingOnThisPlayer") { data, ack in
            println("waitingOnThisPlayer")
            
        }
        socket.on("waitingOnOtherPlayer") { data, ack in
            println("waitingOnOtherPlayer")
            
        }
        
        
        
    }
    
//    socket.on("yourTurn") { data, ack in
//    for space in self.spaces {
//    space.enabled = true
//    }
//    }

}