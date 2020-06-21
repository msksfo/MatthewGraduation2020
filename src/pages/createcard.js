import React, { useState, useEffect, useRef } from "react"
import Head from "../components/head"

import Layout from "../components/layout/layout"
import createCardStyles from "../styles/createCard.module.css"

// TODO: make another canvas for background color => user should be able to change background color without wiping out all their work

const CreateCard = props => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [clearedCanvas, setClearedCanvas] = useState(false)
  const [cardSubmitted, setCardSubmitted] = useState(false)

  // dont allow user to submit unless they drew something
  const [isValidSubmission, setIsValidSubmission] = useState(false)

  // When the canvas is first mounted, color the background white. Otherwise, when I save the canvas as an image, the background will be black.
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#ffffff")

  const [brushStrokeColor, setBrushStrokeColor] = useState("#000000")
  const [brushStrokeSize, setBrushStrokeSize] = useState(1)
  const [message, setMessage] = useState("")

  // x & y coordinates on the canvas, for the draw function
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  // width of canvas parent div
  const [width, setWidth] = useState(0)

  // the boundingClientRect() of the canvas element
  const [bounds, setBounds] = useState({ top: 0, left: 0, right: 0, bottom: 0 })

  const canvasRef = useRef(null)

  useEffect(() => {
    document.body.addEventListener("touchstart", function (e) {
      //console.log(e.target.localName === "canvas")

      if (e.target.localName === "canvas") {
        e.preventDefault()
        //console.log(e.target)
      }
    })

    document.body.addEventListener(
      "touchmove",
      function (e) {
        //console.log(e.target)
        if (e.target.localName === "canvas") {
          e.preventDefault()
          //console.log(e.target)
        }
      },
      { passive: false }
    )
  }, [])

  useEffect(() => {
    let dpi = window.devicePixelRatio
    const canvas = canvasRef.current.getContext("2d")

    // when the canvas parent div is mounted, get it's width. the canvas width will be the size of it's parent.
    if (canvasRef.current.parentNode) {
      // ! removed * dpi until I figure out how to make it work
      setWidth(canvasRef.current.parentNode.clientWidth)

      setBounds(() => {
        return {
          top: canvasRef.current.getBoundingClientRect().top,
          left: canvasRef.current.getBoundingClientRect().left,
          right: canvasRef.current.getBoundingClientRect().right,
          bottom: canvasRef.current.getBoundingClientRect().bottom,
        }
      })
      //console.log(bounds)
    }

    if (clearedCanvas) {
      setCanvasBackgroundColor("#ffffff")
      setClearedCanvas(false)
      setMessage("")
      setIsValidSubmission(false)
    } else if (cardSubmitted) {
      setCanvasBackgroundColor("#ffffff")
      setBrushStrokeSize(1)
      setBrushStrokeColor("#000000")
      setIsDrawing(false)
      setClearedCanvas(false)
      setCardSubmitted(false)
      setMessage("")
      setIsValidSubmission(false)
    }

    canvas.fillStyle = canvasBackgroundColor
    canvas.fillRect(0, 0, width, width)

    // Rerun this effect when user clears the canvas, submits the card, choses a different background color, or resizes the browser
  }, [clearedCanvas, canvasBackgroundColor, cardSubmitted, width])

  const getMousePosition = e => {
    return {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    }
  }

  const draw = (e, context, locationObject) => {
    context.strokeStyle = brushStrokeColor
    context.lineWidth = brushStrokeSize

    context.linejoin = "round"
    context.linecap = "round"

    // do not draw if they are moving the mouse, but not moused down
    if (!isDrawing) {
      return
    } else {
      context.beginPath()

      // start from coordinates held in state
      context.moveTo(locationObject.x, locationObject.y)

      // go to wherever they have moved the mouse to
      // ! this works but the image is blurry
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)

      //! this makes image sharp (when multiplying width by dpi) but mouse position is off
      /*
      context.lineTo(
        ((e.nativeEvent.clientX - bounds.left) / (bounds.right - bounds.left)) *
          width,
        ((e.nativeEvent.clientY - bounds.top) / (bounds.bottom - bounds.top)) *
          (width * 0.75)
      )
      */

      context.stroke()

      // update state coordinates
      //! this works, but the image is blurry
      setCoords({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      })

      setIsValidSubmission(true)

      //! this makes a sharp image, but the mouse position is off
      /*
      setCoords({
        x:
          ((e.nativeEvent.clientX - bounds.left) /
            (bounds.right - bounds.left)) *
          width,
        y:
          ((e.nativeEvent.clientY - bounds.top) /
            (bounds.bottom - bounds.top)) *
          (width * 0.75),
      })
      */
    }
  }

  const mobileDraw = (e, context, locationObject) => {
    console.log(e)
    context.strokeStyle = brushStrokeColor
    context.lineWidth = brushStrokeSize

    context.linejoin = "round"
    context.linecap = "round"

    // do not draw if they are moving the mouse, but not moused down
    if (!isDrawing) {
      return
    } else {
      context.beginPath()

      // start from coordinates held in state
      context.moveTo(locationObject.x, locationObject.y)

      // go to wherever they have moved the mouse to
      let touch = e.touches[0]
      context.lineTo(touch.clientX - bounds.left, touch.clientY - bounds.top)

      context.stroke()

      // update state coordinates
      setCoords({
        x: touch.clientX - bounds.left,
        y: touch.clientY - bounds.top,
      })

      setIsValidSubmission(true)
    }
  }

  /* 
    Code based off of html5canvastutorials.com
    www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
  */
  const wrapText = (context, str, x, y, maxWidth, lineHeight) => {
    /* 
    1. create an empty string 
    2. inside a loop, add words to the string created in step 1 one at a time, checking if it will fit inside the width of the canvas (minus 20px on each side as padding). 
       3. If the string is overflowing the canvas, call fillText with the part of the string that fits (the string outside the loop)
       4.  reset the string to be the current word in the loop (the one that would have caused the width to overflow), then increase the y value to simulate /n.  
    */

    context.font = "30px serif"
    context.fillStyle = brushStrokeColor

    let line = ""
    let words = str.split(" ")

    for (let word of words) {
      let tempLine = line + word
      let lineWidth = context.measureText(tempLine).width

      if (lineWidth > maxWidth - 40) {
        context.fillText(line, x, y)
        line = word + " "
        y += lineHeight
      } else {
        line = tempLine + " "
      }
    }

    context.fillText(line, x, y)
    setIsValidSubmission(true)
  }

  const uploadToCloudinary = imageUrl => {
    const uploadPreset = "mattGradProject"
    const uploadEndpoint = "https://api.cloudinary.com/v1_1/tesguerra/upload/"

    const fd = new FormData()
    fd.append("file", imageUrl)
    fd.append("upload_preset", uploadPreset)

    fetch(uploadEndpoint, {
      method: "post",
      body: fd,
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Layout>
      <Head title="Create Card" />
      <div className={createCardStyles.contentWrapper}>
        <div className={createCardStyles.gridWrapper}>
          <div className={createCardStyles.cardDirections}>
            <p>Please create a nice card for me in blue bordered box below!</p>
            <ol
              aria-label="Directions"
              className={createCardStyles.cardDirectionsList}
            >
              <li>
                Choose the background color first! Or leave it as is for a white
                background.
              </li>
              <li>
                Next, choose the brush color. Or leave it as is for black text.
              </li>
              <li>
                Type your card text in the message box. When you are finished,
                click 'Add Message'.
              </li>
              <li>
                Draw a picture, if you want. Feel free to change the brush color
                and/or the brush stroke thickness.
              </li>
              <li>
                Click 'Submit' to send me the card when you are finished. Click
                'Clear' if you've made a mistake and want to start over
              </li>
            </ol>
          </div>
          <div className={createCardStyles.colorChoices}>
            <label htmlFor="backgroundColorInput">
              Card background color: &nbsp;
              <input
                type="color"
                name="backgroundColorInput"
                id="backgroundColorInput"
                value={canvasBackgroundColor}
                onChange={e => {
                  setCanvasBackgroundColor(e.target.value)
                }}
              />
            </label>

            <label htmlFor="brushColorInput">
              Brush color: &nbsp;
              <input
                type="color"
                name="brushColorInput"
                id="brushColorInput"
                value={brushStrokeColor}
                onChange={e => {
                  setBrushStrokeColor(e.target.value)
                }}
              />
            </label>

            <label htmlFor="strokeThicknessInput">
              Brush stroke thickness: &nbsp;
              <input
                type="number"
                min="1"
                name="strokeThicknessInput"
                id="strokeThicknessInput"
                value={brushStrokeSize}
                onChange={e => {
                  setBrushStrokeSize(e.target.value)
                }}
              />
            </label>

            <label htmlFor="birthdayMessage">
              Message: &nbsp;
              <textarea
                id="birthdayMessage"
                value={message}
                onChange={e => {
                  setMessage(e.target.value)
                }}
                rows="3"
              ></textarea>
            </label>
            <button
              className={createCardStyles.addMessageButton}
              onClick={e => {
                const ctx = canvasRef.current.getContext("2d")
                const birthdayMessage = message

                wrapText(ctx, birthdayMessage, 20, 35, width, 35)
              }}
            >
              Add Message
            </button>
          </div>
        </div>
        <div className={createCardStyles.clearOrSubmitButtons}>
          <button
            className={createCardStyles.clearButton}
            onClick={e => {
              setClearedCanvas(true)
            }}
          >
            Clear
          </button>

          <button
            className={createCardStyles.submitButton}
            onClick={e => {
              const data = canvasRef.current.toDataURL("image/jpeg")

              if (isValidSubmission) {
                uploadToCloudinary(data)
                setCardSubmitted(true)
              }
            }}
          >
            Submit
          </button>
        </div>

        <div className={createCardStyles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            width={width}
            height={width * 0.75}
            onMouseDown={e => {
              // with vanilla js, I would use e.offsetX but in react this is undefined, so use nativeEvent to get what I want
              // ! this works but the image is blurry
              const x = e.nativeEvent.offsetX
              const y = e.nativeEvent.offsetY

              //! wip, mouse position is still off
              /*
              const x =
                ((e.nativeEvent.clientX - bounds.left) /
                  (bounds.right - bounds.left)) *
                width
              const y =
                ((e.nativeEvent.clientY - bounds.top) /
                  (bounds.bottom - bounds.top)) *
                (width * 0.75)
              */

              setIsDrawing(true)
              setCoords({
                x,
                y,
              })
            }}
            onTouchStart={e => {
              let touch = e.touches[0]
              console.log(touch)

              let x = touch.clientX - bounds.left
              let y = touch.clientY - bounds.top

              console.log(x, y, bounds)

              setIsDrawing(true)
              setCoords({
                x,
                y,
              })
            }}
            onMouseMove={e => {
              const ctx = canvasRef.current.getContext("2d")

              draw(e, ctx, coords)
            }}
            onTouchMove={e => {
              let touch = e.touches[0]
              let x = touch.clientX - bounds.left
              let y = touch.clientY - bounds.top

              const ctx = canvasRef.current.getContext("2d")

              mobileDraw(e, ctx, coords)
            }}
            onTouchEnd={e => {
              setIsDrawing(false)
              setCoords({
                x: 0,
                y: 0,
              })
            }}
            onMouseUp={() => {
              setIsDrawing(false)

              setCoords({
                x: 0,
                y: 0,
              })
            }}
            onMouseOut={() => {
              setIsDrawing(false)
            }}
            onBlur={() => {
              setIsDrawing(false)
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default CreateCard
