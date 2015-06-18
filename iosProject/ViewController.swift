//
//  ViewController.swift
//  iosProject
//
//  Created by Shain Lafazan on 6/18/15.
//  Copyright (c) 2015 Shain Lafazan. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    let socket = SocketIOClient(socketURL: "192.168.1.125:8000", options: ["log": true])
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        socket.on("error") { data, ack in
            println("got an error bro")
            println(data)
            println(ack)
            
        }
        
        socket.on("connect") { data, ack in
            println("socket connected")
        }
        
        socket.connect()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

