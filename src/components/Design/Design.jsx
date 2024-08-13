import { TbRectangle } from "react-icons/tb";
import { IoMdDownload, IoMdMoon } from "react-icons/io";
import { FaLongArrowAltRight, FaSun } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { MdTextFields } from "react-icons/md";
import {
  Text,
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
  Transformer,
} from "react-konva";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "./Constants";

export default function Design() {
  const stageRef = useRef();
  const transformerRef = useRef();
  const isPaining = useRef(false);
  const currentShapeId = useRef();
  const textInputRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#808080");
  const [textContent, setTextContent] = useState("Erase & Write");
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setScribbles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  const strokeColor = darkMode ? "#ffffff" : "#333";
  const isDraggable = action === ACTIONS.SELECT;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const updateSize = () => {
      const parent = stageRef.current.getStage().container().parentElement;
      setParentSize({
        width: parent.clientWidth,
        height: parent.clientHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function onPointerDown() {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) => [
          ...rectangles,
          { id, x, y, height: 20, width: 20, fillColor },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => [
          ...circles,
          { id, x, y, radius: 20, fillColor },
        ]);
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) => [
          ...arrows,
          { id, points: [x, y, x + 20, y + 20], fillColor },
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) => [
          ...scribbles,
          { id, points: [x, y], fillColor },
        ]);
        break;
      case ACTIONS.TEXT:
        setTexts((texts) => [
          ...texts,
          { id, x, y, text: textContent, fillColor, width: 100, height: 30 },
        ]);
        break;
      default:
        break;
    }
  }

  function onPointerMove() {
    if (!isPaining.current || action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) =>
          rectangles.map((rectangle) =>
            rectangle.id === currentShapeId.current
              ? {
                  ...rectangle,
                  width: x - rectangle.x,
                  height: y - rectangle.y,
                }
              : rectangle
          )
        );
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) =>
          circles.map((circle) =>
            circle.id === currentShapeId.current
              ? {
                  ...circle,
                  radius: Math.sqrt(
                    Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2)
                  ),
                }
              : circle
          )
        );
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) =>
          arrows.map((arrow) =>
            arrow.id === currentShapeId.current
              ? { ...arrow, points: [arrow.points[0], arrow.points[1], x, y] }
              : arrow
          )
        );
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) =>
          scribbles.map((scribble) =>
            scribble.id === currentShapeId.current
              ? { ...scribble, points: [...scribble.points, x, y] }
              : scribble
          )
        );
        break;
      case ACTIONS.TEXT:
        // Allow text position update or resizing if needed
        break;
      default:
        break;
    }
  }

  function onPointerUp() {
    isPaining.current = false;
  }

  function handleExport() {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function onClick(e) {
    if (action !== ACTIONS.SELECT) return;
    const clickedNode = e.target;
    transformerRef.current.nodes([clickedNode]);

    if (clickedNode.getClassName() === "Text") {
      const textNode = clickedNode;
      textNode.draggable(false);
      textNode.hide();
      const textInput = document.createElement("input");
      textInput.value = textNode.text();
      textInput.style.position = "absolute";
      textInput.style.top = textNode.getAbsolutePosition().y + "px";
      textInput.style.left = textNode.getAbsolutePosition().x + "px";
      textInput.style.width = textNode.width() + "px";
      textInput.style.height = textNode.height() + "px";
      textInput.style.fontSize = textNode.fontSize() + "px";
      textInput.style.border = "1px solid #333";
      textInput.style.backgroundColor = "transparent";
      textInput.style.color = textNode.fill();
      textInput.style.outline = "none";
      textInput.style.zIndex = 1;
      textInputRef.current = textInput;
      document.body.appendChild(textInput);
      textInput.focus();

      textInput.addEventListener("blur", () => {
        textNode.text(textInput.value);
        textNode.show();
        textNode.draggable(isDraggable);
        setTexts((texts) =>
          texts.map((t) =>
            t.id === textNode.id() ? { ...t, text: textInput.value } : t
          )
        );
        document.body.removeChild(textInput);
        textInputRef.current = null;
      });
    }
  }

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${
        darkMode ? "bg-slate-900  text-gray-700" : "bg-white text-black"
      }`}
    >
      <div className="absolute top-0 z-10 w-full py-2 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={handleExport}
            className="hover:bg-violet-100 p-1 rounded"
          >
            <IoMdDownload size={"2rem"} />
          </button>
        </div>
        <div className="flex items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
          <button
            className={`p-1 rounded ${
              action === ACTIONS.SELECT
                ? "bg-violet-300"
                : "hover:bg-violet-100"
            }`}
            onClick={() => setAction(ACTIONS.SELECT)}
          >
            <GiArrowCursor size={"2rem"} />
          </button>
          <button
            className={`p-1 rounded ${
              action === ACTIONS.RECTANGLE
                ? "bg-violet-300"
                : "hover:bg-violet-100"
            }`}
            onClick={() => setAction(ACTIONS.RECTANGLE)}
          >
            <TbRectangle size={"2rem"} />
          </button>
          <button
            className={`p-1 rounded ${
              action === ACTIONS.CIRCLE
                ? "bg-violet-300"
                : "hover:bg-violet-100"
            }`}
            onClick={() => setAction(ACTIONS.CIRCLE)}
          >
            <FaRegCircle size={"1.5rem"} />
          </button>
          <button
            className={`p-1 rounded ${
              action === ACTIONS.ARROW ? "bg-violet-300" : "hover:bg-violet-100"
            }`}
            onClick={() => setAction(ACTIONS.ARROW)}
          >
            <FaLongArrowAltRight size={"1.5rem"} />
          </button>
          <button
            className={`p-1 rounded ${
              action === ACTIONS.SCRIBBLE
                ? "bg-violet-300"
                : "hover:bg-violet-100"
            }`}
            onClick={() => setAction(ACTIONS.SCRIBBLE)}
          >
            <LuPencil size={"1.5rem"} />
          </button>
          <button
            className={`p-1 rounded ${
              action === ACTIONS.TEXT ? "bg-violet-300" : "hover:bg-violet-100"
            }`}
            onClick={() => setAction(ACTIONS.TEXT)}
          >
            <MdTextFields size={"2rem"} />
          </button>
          <input
            className="text-lg rounded-lg border"
            value={fillColor}
            type="color"
            onChange={(e) => setFillColor(e.target.value)}
          />
          <input
            className="p-1 bg-slate-300 text-lg rounded-lg border"
            value={textContent}
            type="text"
            onChange={(e) => setTextContent(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="hover:bg-violet-100 p-1 rounded"
          >
            {darkMode ? <FaSun size={"2rem"} /> : <IoMdMoon size={"2rem"} />}
          </button>
        </div>
      </div>

      {/* Drawing Area */}
      <Stage
        ref={stageRef}
        width={parentSize.width}
        height={parentSize.height}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onClick}
      >
        <Layer>
          {rectangles.map((rectangle) => (
            <Rect
              key={rectangle.id}
              id={rectangle.id}
              x={rectangle.x}
              y={rectangle.y}
              width={rectangle.width}
              height={rectangle.height}
              fill={rectangle.fillColor}
              stroke={strokeColor}
              draggable={isDraggable}
            />
          ))}
          {circles.map((circle) => (
            <Circle
              key={circle.id}
              id={circle.id}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fill={circle.fillColor}
              stroke={strokeColor}
              draggable={isDraggable}
            />
          ))}
          {arrows.map((arrow) => (
            <Arrow
              key={arrow.id}
              id={arrow.id}
              points={arrow.points}
              fill={arrow.fillColor}
              stroke={strokeColor}
              draggable={isDraggable}
            />
          ))}
          {scribbles.map((scribble) => (
            <Line
              key={scribble.id}
              id={scribble.id}
              points={scribble.points}
              stroke={scribble.fillColor}
              strokeWidth={2}
              draggable={isDraggable}
            />
          ))}
          {texts.map((text) => (
            <Text
              key={text.id}
              id={text.id}
              x={text.x}
              y={text.y}
              text={text.text}
              fill={text.fillColor}
              draggable={isDraggable}
              onDblClick={onClick}
              backgroundFill={darkMode ? "#333" : "#fff"}
              backgroundStroke={darkMode ? "#333" : "#fff"}
            />
          ))}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
}
