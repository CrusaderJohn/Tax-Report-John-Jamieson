const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/taxReports/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/account');
        } else {
            alert('Failed to delete project');
        }
    }
};

$("#deleteButton").on("click",delButtonHandler);
