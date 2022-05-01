const likeButton = document.querySelectorAll("#heart");
console.log(likeButton);

async function likeBtn(productId, btn) {
  try {
    // Send a Ajax request
    const response = await axios({
      method: "post",
      url: `/product/${productId}/like`,
      //setting request as ajax request
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    if (btn.children[0].classList.contains("fas")) {
      btn.children[0].classList.remove("fas", "text-danger");
      btn.children[0].classList.add("far");
    } else {
      btn.children[0].classList.remove("far");
      btn.children[0].classList.add("fas", "text-danger");
    }
  } catch (err) {
    window.location.replace("/login");
    console.log(err.message);
  }
}

for (let btn of likeButton) {
  btn.addEventListener("click", (e) => {
    const productId = btn.getAttribute("product_id");
    likeBtn(productId, btn);
    //Frontend part using dom manipulation
  });
}
