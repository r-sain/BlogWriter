import React, { useEffect, useState } from "react";
import "./categoriesStyles.css";
import { BsTrash3Fill } from "react-icons/bs";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["link", "image"],
  ],
};

function Categories() {
  const [newKeywords, setNewKeywords] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    {
      name: "Technology",
      keywords: ["computer", "programming", "software"],
      topics: generateTopics(10),
    },
    {
      name: "Fashion",
      keywords: ["clothing", "style", "fashionista"],
      topics: generateTopics(10),
    },
    {
      name: "Health and Wellness",
      keywords: ["fitness", "nutrition", "wellness"],
      topics: generateTopics(10),
    },
    {
      name: "Travel and Adventure",
      keywords: ["travel", "hiking", "camping"],
      topics: generateTopics(10),
    },
    {
      name: "Entertainment",
      keywords: ["movies", "music", "books"],
      topics: generateTopics(10),
    },
  ]);
  console.log(categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTopic, setNewTopic] = useState("");
  const [randomKeyword, setRandomKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
      setShowCategoryInput(false);
    }
  };
  const generateLorem = () => {
    const lorem =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus id purus fringilla eleifend a vitae risus. Sed facilisis dignissim mi, vel fringilla sem ultrices vel. Mauris eget tortor id mauris consequat accumsan. Curabitur tincidunt mi enim, et viverra odio consequat ac. Aliquam tempor nisl a turpis iaculis, ut rhoncus ligula aliquam. Nunc laoreet malesuada odio, non convallis ex venenatis sit amet. Mauris sagittis, leo nec malesuada vulputate, turpis metus eleifend nisl, vitae faucibus justo dui sed enim. Sed dictum pulvinar venenatis. Mauris nec dolor eu neque dapibus tincidunt. Nam auctor interdum felis, eget consequat lectus facilisis nec. Donec sodales lorem id ex venenatis lobortis. Fusce vestibulum neque et turpis auctor gravida. Vivamus id nisi eu erat aliquam iaculis ac et felis. In consequat venenatis sapien, ut luctus purus tristique non. Fusce sollicitudin leo at ultricies dictum. Aliquam eleifend arcu sit amet mi vehicula, sed placerat dolor scelerisque. Pellentesque sodales arcu arcu, id volutpat enim ultrices sed. Sed lacinia leo in ligula laoreet feugiat. Sed suscipit nisi sed laoreet tincidunt. Maecenas ac malesuada tellus. Nunc consectetur ullamcorper ante, et viverra nunc tincidunt sed. Mauris in est lorem. Sed in nisl tristique, lacinia nunc sit amet, luctus tortor. Aliquam et lectus vestibulum, eleifend dolor nec, dignissim neque. Etiam aliquam lacus nec tortor feugiat sagittis. Aenean in fermentum metus. Donec blandit diam id orci pulvinar luctus. Ut iaculis volutpat neque sed blandit. Integer consectetur nisl non turpis dictum, eget interdum ex congue. Morbi sit amet nunc turpis. Morbi vehicula nunc id lorem rutrum pulvinar. Proin id vulputate mi. Quisque tincidunt nunc arcu, a congue turpis gravida ac. Suspendisse posuere enim vitae dui interdum, a luctus leo pellentesque. Curabitur eget mauris dapibus, vestibulum quam sed, interdum tortor. Mauris commodo urna vel sapien tempus, id aliquam nisi fringilla. Phasellus pretium pharetra neque ut viverra. Sed nec enim sit amet sapien dapibus suscipit vitae nec sem.";

    const currentTopic = selectedCategory && selectedCategory.selectedTopic;
    const currentKeywords =
      selectedCategory && selectedCategory.keywords
        ? selectedCategory.keywords.join(", ")
        : "No keywords";

    const paragraph = `${lorem}\n\nTopic: ${
      currentTopic ? currentTopic.name : "No topic selected"
    }\nKeywords: ${currentKeywords}`;

    setEditorContent(paragraph);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (newTopic.trim() !== "") {
        handleAddTopic();
      }
    }
  };

  useEffect(() => {
    const getRandomKeyword = () => {
      if (
        selectedCategory &&
        selectedCategory.keywords &&
        selectedCategory.keywords.length > 0
      ) {
        return selectedCategory.keywords[
          Math.floor(Math.random() * selectedCategory.keywords.length)
        ];
      } else {
        return "";
      }
    };

    setRandomKeyword(getRandomKeyword());
  }, [selectedCategory]);

  function generateTopics(numTopics) {
    const topics = [];
    for (let i = 1; i <= numTopics; i++) {
      topics.push({ id: i, name: `Topic ${i}` });
    }
    return topics;
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleDeleteTopic = (category, topicId) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((cat) => {
        if (cat.name === category.name) {
          const updatedTopics = cat.topics.filter(
            (topic) => topic.id !== topicId
          );
          return { ...cat, topics: updatedTopics };
        }
        return cat;
      });

      return updatedCategories;
    });

    setSelectedCategory((prevSelectedCategory) => {
      if (prevSelectedCategory && prevSelectedCategory.name === category.name) {
        return {
          ...prevSelectedCategory,
          topics: prevSelectedCategory.topics.filter(
            (topic) => topic.id !== topicId
          ),
        };
      }
      return prevSelectedCategory;
    });
  };

  const handleAddTopic = (categoryName, topic) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category) => {
        if (category.name === categoryName) {
          const updatedKeywords = [...category.keywords, topic];
          return { ...category, keywords: updatedKeywords };
        }
        return category;
      });

      return updatedCategories;
    });

    setSelectedCategory((prevSelectedCategory) => {
      if (prevSelectedCategory && prevSelectedCategory.name === categoryName) {
        return {
          ...prevSelectedCategory,
          keywords: [...prevSelectedCategory.keywords, topic],
        };
      }
      return prevSelectedCategory;
    });
  };

  useEffect(() => {
    if (
      selectedCategory &&
      selectedCategory.keywords &&
      selectedCategory.keywords.length > 0
    ) {
      setRandomKeyword(
        selectedCategory.keywords[
          Math.floor(Math.random() * selectedCategory.keywords.length)
        ]
      );
    } else {
      setRandomKeyword("");
    }
  }, [selectedCategory, categories]);

  const handleWriteClick = (topic) => {
    setSelectedCategory((prevSelectedCategory) => {
      if (
        prevSelectedCategory &&
        prevSelectedCategory.name === selectedCategory.name
      ) {
        return { ...prevSelectedCategory, selectedTopic: topic };
      }
      return prevSelectedCategory;
    });

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      return;
    }

    const newCategoryObj = {
      name: newCategory,
      keywords: [],
      topics: [],
    };

    setCategories((prevCategories) => [...prevCategories, newCategoryObj]);
    setNewCategory("");
  };

  const handleAddTopicNew = () => {
    if (newTopic.trim() === "") {
      return; // Don't add empty topics
    }

    const newKeywordsArray = newKeywords
      .split(",")
      .map((keyword) => keyword.trim());

    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category) => {
        if (category.name === selectedCategory.name) {
          const updatedKeywords = [...category.keywords, ...newKeywordsArray];
          const updatedTopics = [
            ...category.topics,
            { id: Date.now(), name: newTopic },
          ];
          return {
            ...category,
            keywords: updatedKeywords,
            topics: updatedTopics,
          };
        }
        return category;
      });

      return updatedCategories;
    });

    setSelectedCategory((prevSelectedCategory) => {
      if (
        prevSelectedCategory &&
        prevSelectedCategory.name === selectedCategory.name
      ) {
        const updatedKeywords = [
          ...prevSelectedCategory.keywords,
          ...newKeywordsArray,
        ];
        const updatedTopics = [
          ...prevSelectedCategory.topics,
          { id: Date.now(), name: newTopic },
        ];
        return {
          ...prevSelectedCategory,
          keywords: updatedKeywords,
          topics: updatedTopics,
        };
      }
      return prevSelectedCategory;
    });

    setNewTopic("");
    setNewKeywords("");
  };

  function generateRandomColor() {
    return `#${Math.floor(Math.random() * 1677215).toString(16)}`;
  }

  function getStoredColors() {
    const storedColors = localStorage.getItem("keywordColors");
    return storedColors ? JSON.parse(storedColors) : {};
  }

  function storeColors(colors) {
    localStorage.setItem("keywordColors", JSON.stringify(colors));
  }

  function getColorForKeyword(keyword) {
    const storedColors = getStoredColors();

    if (storedColors[keyword]) {
      return storedColors[keyword];
    }

    const color = generateRandomColor();
    storedColors[keyword] = color;
    storeColors(storedColors);

    return color;
  }
  return (
    <div id="Categories">
      <div className="Head">
        <div className="heading">
          Categories{" "}
          <span onClick={() => setShowCategoryInput(!showCategoryInput)}>
            {!showCategoryInput ? (
              <AiOutlinePlus style={{ color: "#eb643b" }} />
            ) : (
              <AiOutlineClose style={{ color: "#eb643b" }} />
            )}
          </span>
          {showCategoryInput && (
            <div className="add-category">
              <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={() => {
                  handleAddCategory();
                  setShowCategoryInput(false);
                }}
              >
                Add
              </button>
            </div>
          )}
        </div>
        <div className="categories">
          <div className="category-list">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category-item ${
                  selectedCategory && selectedCategory.name === category.name
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <div>{category.name}</div>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="category-add-btn">
              <input
                type="text"
                id="text"
                placeholder="New Topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <input
                type="text"
                id="keywords"
                placeholder="Keywords , seperated"
                value={newKeywords}
                onChange={(e) => setNewKeywords(e.target.value)}
              />
              <button onClick={handleAddTopicNew}>Add Topic</button>
            </div>
          )}
        </div>
      </div>
      <div className="Body">
        {!selectedCategory && (
          <div className="no-selection">Select a category</div>
        )}
        {selectedCategory && (
          <div className="recommended">
            <div className="title">Recommended Topics</div>

            <div className="list-container">
              {selectedCategory.topics.length === 0 && (
                <div className="no-topics">Add topics to the category</div>
              )}
              {selectedCategory.topics.length > 0 && (
                <div className="topic-list">
                  {selectedCategory.topics.map((topic, index) => {
                    const keywords = selectedCategory.keywords || [];
                    const keywordArray =
                      keywords.length > 0 ? [...keywords] : [];

                    return (
                      <div key={index} className="topic-item">
                        <div className="topic-buttons">
                          <button
                            className="write-button"
                            onClick={() => handleWriteClick(topic)}
                          >
                            Write
                          </button>
                          <div
                            className="delete-button"
                            onClick={() =>
                              handleDeleteTopic(selectedCategory, topic.id)
                            }
                          >
                            <BsTrash3Fill size={20} style={{ color: "red" }} />
                          </div>
                        </div>
                        <p>
                          {typeof topic === "string" ? topic : topic.name} :{" "}
                          <span style={{ fontWeight: "600" }}>
                            {randomKeyword || "No keywords"}
                          </span>
                          , is a topic that is related to{" "}
                          {selectedCategory.name} because it contains the
                          keywords:{" "}
                          <span>
                            {keywordArray.length > 0 ? (
                              keywordArray.map((keyword, keywordIndex) => {
                                const color = getColorForKeyword(keyword);

                                return (
                                  <>
                                    {" "}
                                    <span
                                      key={keywordIndex}
                                      style={{
                                        fontWeight: "600",
                                        color: color,

                                        margin: "5px",
                                      }}
                                    >
                                      {keyword.trim()}
                                    </span>
                                  </>
                                );
                              })
                            ) : (
                              <span style={{ fontWeight: "600" }}>
                                No keywords
                              </span>
                            )}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {selectedCategory && selectedCategory.selectedTopic
                  ? selectedCategory.selectedTopic.name
                  : ""}
              </h2>
              <span className="close-button" onClick={handleCloseModal}>
                <FaRegWindowClose size={20} style={{ color: "red" }} />
              </span>
            </div>
            <div className="modal-body">
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                placeholder="Start writing..."
                modules={modules}
              />
            </div>
            <div className="modal-footer">
              <button onClick={generateLorem}>Generate Blog</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
